"""Numerically check the torus model and generated Plotly data.

Run with the same Python environment as generate.py. These finite checks test
the implementation; they do not prove the Morse--Smale assertion in README.md.
"""
import numpy as np

import generate as model


def torus_distance(a, b):
    """Distance in periodic parameter coordinates, sufficient near a limit."""
    return np.linalg.norm((np.asarray(a) - b + np.pi) % model.TAU - np.pi)


def check_geometry(epsilon):
    finite_step = 1e-5
    gradient_error = 0.0
    rotation_error = 0.0
    rng = np.random.default_rng(27026)
    for q in rng.uniform(0, model.TAU, (48, 2)):
        u, v = q
        x = np.asarray(model.xyz(u, v, epsilon))
        tangent = np.column_stack([
            (np.asarray(model.xyz(*(q + delta), epsilon))
             - np.asarray(model.xyz(*(q - delta), epsilon))) / (2 * finite_step)
            for delta in np.eye(2) * finite_step
        ])
        metric = tangent.T @ tangent
        expected_metric = np.diag([(model.R + model.r*np.cos(v))**2, model.r**2])
        assert np.allclose(metric, expected_metric, atol=2e-9, rtol=0)
        # h_e = sqrt(1+epsilon^2) times the rotated Euclidean height.
        ambient_gradient = np.array([0., 0., np.sqrt(1 + epsilon**2)])
        projection = tangent @ np.linalg.solve(metric, tangent.T @ ambient_gradient)
        velocity = tangent @ model.field(q, epsilon)
        gradient_error = max(gradient_error, float(np.linalg.norm(velocity + projection)))
        assert gradient_error < 2e-8
        dh = np.array([
            (model.height(q + delta, epsilon) - model.height(q - delta, epsilon))
            / (2 * finite_step) for delta in np.eye(2) * finite_step
        ])
        f = model.field(q, epsilon)
        assert abs(dh @ f + f @ metric @ f) < 2e-8
        rotation_error = max(rotation_error, abs(x[2] * np.sqrt(1 + epsilon**2)
                                                  - model.height(q, epsilon)))
        scale = np.sqrt(1 + epsilon**2)
        old_y, old_z = (x[1] + epsilon*x[2])/scale, (x[2] - epsilon*x[1])/scale
        assert abs((np.hypot(x[0], old_z) - model.R)**2 + old_y**2 - model.r**2) < 1e-12
    assert rotation_error < 1e-12
    print(f'  metric / negative gradient: max ambient residual {gradient_error:.2e}')
    print(f'  rotated height and torus equation: max height residual {rotation_error:.2e}')


def check_critical_points(epsilon):
    step = 2e-4
    points = model.critical_points(epsilon)
    heights = []
    for key, point in points.items():
        q = np.array([point['u'], point['v']])
        assert np.linalg.norm(model.field(q, epsilon)) < 2e-14, key
        center = model.height(q, epsilon)
        hessian = np.empty((2, 2))
        for i, delta in enumerate(np.eye(2) * step):
            hessian[i, i] = (model.height(q + delta, epsilon) - 2*center
                             + model.height(q - delta, epsilon))/step**2
        du, dv = np.eye(2) * step
        hessian[0, 1] = hessian[1, 0] = (
            model.height(q + du + dv, epsilon) - model.height(q + du - dv, epsilon)
            - model.height(q - du + dv, epsilon) + model.height(q - du - dv, epsilon)
        )/(4*step**2)
        eigenvalues = np.linalg.eigvalsh(hessian)
        assert np.min(np.abs(eigenvalues)) > .1, (key, eigenvalues)
        assert np.count_nonzero(eigenvalues < 0) == point['index'], (key, eigenvalues)
        heights.append(center)
    assert np.all(np.diff(heights) > 0)
    print('  four critical points: stationary, nondegenerate, indices 0 / 1 / 1 / 2')


def check_trajectories(epsilon):
    worst_increase = 0.0
    seeds = [(-1., -.85), (.12, .85), (1.05, -.85),
             (2.05, .85), (3.18, -.85), (4.10, .85)]
    for seed in seeds:
        for direction in [-1, 1]:
            uv = model.trajectory(seed, direction, epsilon)
            assert np.all(np.isfinite(uv))
            increments = direction*np.diff(model.height(uv, epsilon))
            worst_increase = max(worst_increase, float(increments.max(initial=0)))
    assert worst_increase < 5e-12
    print(f'  12 forward/backward trajectories: max forbidden height increase {worst_increase:.2e}')


def branch_graph(branch, query):
    if branch[-1, 0] < branch[0, 0]:
        branch = branch[::-1]
    return np.interp(query, branch[:, 0], branch[:, 1])


def check_separatrices():
    epsilon = model.TILT
    points = model.critical_points(epsilon)
    max_step_error = max_seed_error = max_limit_error = 0.0
    for key, target, band in [('p3u', 'p1', (np.pi, model.TAU)),
                              ('p2s', 'p4', (0., np.pi))]:
        original = model.separatrices(epsilon, key, .025, 1e-5)
        finer = model.separatrices(epsilon, key, .0125, 1e-5)
        smaller_seed = model.separatrices(epsilon, key, .0125, 5e-6)
        saddle = points[key[:2]]
        endpoint = points[target]
        for sign, coarse, fine, small in zip([-1, 1], original, finer, smaller_seed):
            for branch in [coarse, fine, small]:
                assert np.all(np.isfinite(branch))
                assert np.all(branch[:, 1] > band[0]) and np.all(branch[:, 1] < band[1])
                assert np.min(sign*np.diff(branch[:, 0])) > -1e-12
                assert torus_distance(branch[0], [saddle['u'], saddle['v']]) < 1e-12
                # The final sample is an exact appended endpoint; test the
                # penultimate sample to assess the actual numerical limit.
                error = torus_distance(branch[-2], [endpoint['u'], endpoint['v']])
                max_limit_error = max(max_limit_error, error)
                assert error < 2e-7
                assert torus_distance(branch[-1], [endpoint['u'], endpoint['v']]) < 1e-12
            # Compare the same graph coordinates rather than integration times:
            # seed changes produce a substantial but irrelevant time shift.
            query = saddle['u'] + sign*np.linspace(.06, np.pi - .06, 1200)
            step_error = np.max(np.abs(branch_graph(coarse, query) - branch_graph(fine, query)))
            seed_error = np.max(np.abs(branch_graph(fine, query) - branch_graph(small, query)))
            max_step_error = max(max_step_error, float(step_error))
            max_seed_error = max(max_seed_error, float(seed_error))
    assert max_step_error < 2e-4
    assert max_seed_error < 2e-4
    print(f'  tilted separatrices: all four branches stay in their open bands; limit error {max_limit_error:.2e}')
    print(f'  graph convergence: step halving {max_step_error:.2e}; seed halving {max_seed_error:.2e} (limit 2e-4)')


def check_open_cells(epsilon):
    points = model.critical_points(epsilon)
    max_limit_error = 0.0
    for boundary, cut, target, direction in [('p3u', -np.pi/2, 'p4', -1),
                                             ('p2s', np.pi/2, 'p1', 1)]:
        left, right = model.separatrices(epsilon, boundary)
        assert abs(left[-1, 0] - cut) < 1e-12
        assert abs(right[-1, 0] - cut - model.TAU) < 1e-12
        assert abs(left[-1, 1] - right[-1, 1]) < 1e-12
        # After cutting one meridian, subtracting the single-valued boundary
        # graph identifies the complement with (0, 2pi) x (0, 2pi).
        # Sample points inside that chart and independently check their limits.
        us = cut + model.TAU*np.array([.13, .38, .67, .89])
        bs = model.boundary_graph(epsilon, boundary, us)
        p = points[target]
        for u, b in zip(us, bs):
            for offset in model.TAU*np.array([.12, .5, .88]):
                uv = model.trajectory([u, b + offset], direction, epsilon)
                error = torus_distance(uv[-1], [p['u'], p['v']])
                max_limit_error = max(max_limit_error, error)
                assert error < 2e-7, (epsilon, boundary, u, offset, error)
    print(f'  open-cell charts: 24 interior samples reach the expected limit, max error {max_limit_error:.2e}')


def check_generated_data(epsilon):
    variant = model.build_variant(epsilon)
    groups, traces = variant['groups'], variant['data']
    expected_manifolds = {f'p{i}{mode}' for i in range(1, 5) for mode in ['s', 'u']}
    assert expected_manifolds <= groups.keys()
    assert expected_manifolds == variant['descriptions'].keys()
    indices = [i for group in groups.values() for i in group]
    assert len(indices) == len(set(indices))
    assert sorted(indices) == list(range(len(traces)))
    for trace in traces:
        for key in ['x', 'y', 'z', 'u', 'v', 'w', 'surfacecolor']:
            if key in trace:
                assert np.all(np.isfinite(np.asarray(trace[key], dtype=float))), (trace['type'], key)
        assert np.shape(trace['x']) == np.shape(trace['y']) == np.shape(trace['z'])
    colors = [traces[i]['line']['color'] for i in groups['flows']]
    assert len(colors) == len(set(colors)) == 12
    assert colors == model.FLOW_COLORS
    print(f'  Plotly payload: {len(traces)} finite traces, complete group partition, 12 distinct flow colors')


def main():
    assert np.isclose(model.TILT, np.tan(np.deg2rad(26)), atol=1e-14, rtol=0)
    for epsilon, label in [(0., 'symmetric'), (model.TILT, 'tilted 26 degrees')]:
        print(f'{label} (epsilon={epsilon:.12g})')
        check_critical_points(epsilon)
        check_geometry(epsilon)
        check_trajectories(epsilon)
        check_open_cells(epsilon)
        check_generated_data(epsilon)
    check_separatrices()
    print('PASS: numerical and payload checks; the Morse--Smale proof remains analytic.')


if __name__ == '__main__':
    main()
