"""Generate both torus height flows; see README.md for the exact proof.

Install numpy and plotly==6.3.1, then run this file from any directory.
Only generation needs Python; the exported website is static.
"""
from pathlib import Path
from functools import lru_cache
import json
import numpy as np
import plotly.graph_objects as go
from plotly.utils import PlotlyJSONEncoder

R, r = 2.0, 0.68
TAU = 2 * np.pi
TILT = float(np.tan(np.deg2rad(26)))
BLUE, RED, GREY = '#286b9b', '#bb5146', '#dce4e5'
# Trajectory identity only: these colors do not encode a basin or a manifold.
FLOW_COLORS = ['#478b80', '#9873a1', '#c69c4b', '#698cab',
               '#a68062', '#78945b', '#b47591', '#648f98',
               '#8e86b0', '#ad965b', '#749681', '#a78483']
ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent


def rotate(x, y, z, epsilon):
    """Rigid rotation making h_e / sqrt(1+e^2) the displayed height."""
    scale = np.sqrt(1 + epsilon**2)
    return x, (y - epsilon*z)/scale, (z + epsilon*y)/scale


def xyz(u, v, epsilon=0.0, lift=0.0):
    u, v = np.broadcast_arrays(u, v)
    tube = r + lift
    return rotate((R + tube*np.cos(v))*np.cos(u), tube*np.sin(v),
                  (R + tube*np.cos(v))*np.sin(u), epsilon)


def height(q, epsilon=0.0):
    u, v = np.asarray(q).T
    return (R+r*np.cos(v))*np.sin(u) + epsilon*r*np.sin(v)


def field(q, epsilon=0.0):
    """-grad_g(h_e), in original parameter coordinates (not screen axes)."""
    u, v = q
    return np.array([-np.cos(u)/(R+r*np.cos(v)),
                     (np.sin(v)*np.sin(u)-epsilon*np.cos(v))/r])


def critical_points(epsilon):
    alpha = np.arctan(epsilon)
    return {
        'p1': dict(u=3*np.pi/2, v=-alpha % TAU, index=0, name='Minimum'),
        'p2': dict(u=3*np.pi/2, v=np.pi-alpha, index=1, name='Lower saddle'),
        'p3': dict(u=np.pi/2, v=np.pi+alpha, index=1, name='Upper saddle'),
        'p4': dict(u=np.pi/2, v=alpha, index=2, name='Maximum'),
    }


def trajectory(seed, direction, epsilon=0.0, dt=0.025):
    """Dense RK4 samples. No interpolation in ambient R^3 is used."""
    q = np.array(seed, dtype=float)
    points = [q.copy()]
    step_size = dt*direction
    for _ in range(int(160/dt)):
        k1 = field(q, epsilon)
        if np.linalg.norm(k1) < 1e-9:
            break
        k2 = field(q+step_size*k1/2, epsilon)
        k3 = field(q+step_size*k2/2, epsilon)
        k4 = field(q+step_size*k3, epsilon)
        q += step_size*(k1+2*k2+2*k3+k4)/6
        points.append(q.copy())
    return np.array(points)


def resample(uv, count=400):
    """Even arc-length sampling in the induced geometry; still on the torus."""
    coords = np.array(xyz(uv[:, 0], uv[:, 1])).T
    distance = np.r_[0, np.cumsum(np.linalg.norm(np.diff(coords, axis=0), axis=1))]
    keep = np.r_[True, np.diff(distance) > 1e-10]
    target = np.linspace(0, distance[-1], count)
    return np.column_stack([np.interp(target, distance[keep], uv[keep, i])
                            for i in range(2)])


@lru_cache(maxsize=None)
def separatrices(epsilon, key, dt=0.025, seed_offset=1e-5):
    """Two branches, including exact limit endpoints for constructing cut charts.

    p3u follows positive time; p2s follows negative time. At epsilon=0
    their other endpoints are saddles, NOT the minimum/maximum.
    """
    point = critical_points(epsilon)[key[:2]]
    start = np.array([point['u'], point['v']])
    branches = []
    for sign in [-1, 1]:
        if epsilon == 0:
            branch = np.column_stack([np.linspace(start[0], start[0]+sign*np.pi, 400),
                                      np.full(400, np.pi)])
        else:
            branch = trajectory(start+[sign*seed_offset, 0],
                                1 if key == 'p3u' else -1, epsilon, dt)
            endpoint_v = (TAU-np.arctan(epsilon) if key == 'p3u'
                          else np.arctan(epsilon))
            endpoint = [start[0]+sign*np.pi, endpoint_v]
            # Check the numerical endpoint before using the proven exact limit.
            assert np.linalg.norm(branch[-1]-endpoint) < 2e-7
            branch = np.vstack([start, branch, endpoint])
        branches.append(branch)
    return tuple(branches)


def boundary_graph(epsilon, key, u):
    left, right = separatrices(epsilon, key)
    ordered = np.vstack([left[::-1], right[1:]])
    return np.interp(u, ordered[:, 0], ordered[:, 1])


def as_list(values):
    return np.asarray(values).round(6).tolist()


def surface(u, v, epsilon, color):
    if np.ndim(u) == 1 and np.ndim(v) == 1:
        u, v = np.meshgrid(u, v)
    x, y, z = xyz(u, v, epsilon)
    # Smooth analytic normals plus a gentle material highlight avoid the old
    # very dark, metallic-looking shading. Analytic fill also works in WebGL
    # implementations whose surface lighting is less reliable.
    nx, ny, nz = rotate(np.cos(u)*np.cos(v), np.sin(v),
                        np.sin(u)*np.cos(v), epsilon)
    light = np.array([-.5, -1.0, 1.7]); light /= np.linalg.norm(light)
    shade = np.clip(nx*light[0]+ny*light[1]+nz*light[2], 0, 1)
    rgb = np.array([int(color[i:i+2], 16) for i in (1, 3, 5)])
    dark = 'rgb(%d,%d,%d)' % tuple((rgb*.82).astype(int))
    pale = 'rgb(%d,%d,%d)' % tuple((rgb+(255-rgb)*.5).astype(int))
    return go.Surface(x=as_list(x), y=as_list(y), z=as_list(z),
                      surfacecolor=as_list(shade), colorscale=[[0, dark], [1, pale]],
                      cmin=0, cmax=1, showscale=False, hoverinfo='skip',
                      showlegend=False, opacity=1,
                      lighting=dict(ambient=.9, diffuse=.35, roughness=.85,
                                    specular=.08, fresnel=.05),
                      lightposition=dict(x=-8, y=-12, z=18))


def curve(uv, epsilon, color, width=5, dash='solid', lift=.009, name=''):
    x, y, z = xyz(uv[:, 0], uv[:, 1], epsilon, lift)
    return go.Scatter3d(x=as_list(x), y=as_list(y), z=as_list(z), mode='lines',
                        line=dict(color=color, width=width, dash=dash),
                        hoverinfo='skip', showlegend=False, name=name)


def arrows(uv, epsilon, color, size=.065):
    uv = np.asarray(uv)
    x, y, z = xyz(uv[:, 0], uv[:, 1], epsilon, lift=.01)
    vectors = []
    for u, v in uv:
        du, dv = field([u, v], epsilon)
        xu = np.array([-(R+r*np.cos(v))*np.sin(u), 0, (R+r*np.cos(v))*np.cos(u)])
        xv = np.array([-r*np.sin(v)*np.cos(u), r*np.cos(v), -r*np.sin(v)*np.sin(u)])
        velocity = du*xu+dv*xv
        velocity /= np.linalg.norm(velocity)
        vectors.append(rotate(*velocity, epsilon))
    vectors = np.array(vectors)
    return go.Cone(x=as_list(x), y=as_list(y), z=as_list(z),
                   u=as_list(vectors[:, 0]), v=as_list(vectors[:, 1]), w=as_list(vectors[:, 2]),
                   colorscale=[[0, color], [1, color]], showscale=False,
                   sizemode='absolute', sizeref=size, anchor='center',
                   hoverinfo='skip', showlegend=False)


def marker(points, epsilon, color, size=6):
    points = np.atleast_2d(points)
    x, y, z = xyz(points[:, 0], points[:, 1], epsilon)
    return go.Scatter3d(x=as_list(x), y=as_list(y), z=as_list(z), mode='markers',
                        marker=dict(size=size, color=color), hoverinfo='skip', showlegend=False)


def manifold_curves(epsilon, key, color, dash='solid', with_arrows=True):
    traces = []
    samples = []
    for branch in separatrices(epsilon, key):
        branch = resample(branch, 420)
        # Own saddle included; the limiting other critical point excluded.
        traces.append(curve(branch[:-3], epsilon, color, dash=dash))
        samples.append(branch[170])
    if with_arrows:
        traces.append(arrows(samples, epsilon, color))
    return traces


def descriptions(epsilon):
    d = {
        'p4s': ['point', 'Only p₄ itself converges to the maximum in forward time.',
                'Wˢ(p₄) = {p₄}. The pale torus is a reference surface.'],
        'p1u': ['point', 'Only p₁ itself converges to the minimum in backward time.',
                'Wᵘ(p₁) = {p₁}. The pale torus is a reference surface.'],
        'p3s': ['curve', 'The upper meridian with p₄ removed. Both branches flow from p₄ to p₃.',
                'p₃ is included; p₄ is excluded. This manifold is diffeomorphic to ℝ.'],
        'p2u': ['curve', 'The lower meridian with p₁ removed. Both branches flow from p₂ to p₁.',
                'p₂ is included; p₁ is excluded. This manifold is diffeomorphic to ℝ.'],
    }
    if epsilon == 0:
        d.update({
            'p3u': ['curve', 'The inner equator with p₂ removed. Both branches flow from p₃ to p₂.',
                    'p₃ is included; p₂ is excluded. These are the nontransverse saddle connections.'],
            'p2s': ['curve', 'The inner equator with p₃ removed. Both branches flow from p₃ to p₂.',
                    'p₂ is included; p₃ is excluded. Compare with Wᵘ(p₃): their trajectories coincide.'],
            'p4u': ['surface', 'An open cell: points whose backward limit is p₄.',
                    'The inner equator and lower meridian are excluded; the displayed gaps are widened.'],
            'p1s': ['surface', 'An open cell: points whose forward limit is p₁.',
                    'The inner equator and upper meridian are excluded; the displayed gaps are widened.'],
        })
    else:
        d.update({
            'p3u': ['curve', 'Two curved branches leave p₃ and approach p₁; neither reaches the other saddle.',
                    'p₃ is included; p₁ is excluded. This separatrix is sampled numerically in π < v < 2π.'],
            'p2s': ['curve', 'Two curved branches arrive at p₂ from p₄; neither passes through the other saddle.',
                    'p₂ is included; p₄ is excluded. This separatrix is sampled numerically in 0 < v < π.'],
            'p4u': ['surface', 'An open cell: points whose backward limit is p₄.',
                    'Excluded: Wᵘ(p₂), Wᵘ(p₃), and p₁. The curved cut is numerically sampled; gaps are widened.'],
            'p1s': ['surface', 'An open cell: points whose forward limit is p₁.',
                    'Excluded: Wˢ(p₂), Wˢ(p₃), and p₄. The curved cut is numerically sampled; gaps are widened.'],
        })
    return d


def build_variant(epsilon):
    traces, groups = [], {}
    points = critical_points(epsilon)
    def add(name, items):
        groups[name] = list(range(len(traces), len(traces)+len(items)))
        traces.extend(items)

    add('base', [surface(np.linspace(0, TAU, 105), np.linspace(0, TAU, 65), epsilon, GREY)])
    flows = []
    # Evenly spaced with a small deterministic phase shift; same seeds/colors
    # across models, so viewers can follow the change of an individual orbit.
    seeds = [(u, v) for u in [-1., .12, 1.05, 2.05, 3.18, 4.10] for v in [-.85, .85]]
    for i, seed in enumerate(seeds):
        uv = np.vstack([trajectory(seed, -1, epsilon)[::-1],
                        trajectory(seed, 1, epsilon)[1:]])
        flows.append(curve(resample(uv, 440), epsilon, FLOW_COLORS[i], width=2.5,
                           lift=.008, name=f'Trajectory {i+1}'))
    add('flows', flows)

    for key, color in [('p1u', RED), ('p4s', BLUE)]:
        p = points[key[:2]]
        add(key, [marker([p['u'], p['v']], epsilon, color, 7)])

    # Invariant meridians are exact even after tilting.
    gap = .03
    for key, excluded, color in [('p3s', 'p4', BLUE), ('p2u', 'p1', RED)]:
        p, end = points[key[:2]], points[excluded]
        vs = np.linspace(end['v']+gap, end['v']+TAU-gap, 480)
        uv = np.column_stack([np.full(len(vs), p['u']), vs])
        add(key, [curve(uv, epsilon, color),
                  arrows([[p['u'], end['v']+np.pi/2],
                          [p['u'], end['v']+3*np.pi/2]], epsilon, color)])
    add('p3u', manifold_curves(epsilon, 'p3u', RED))
    add('p2s', manifold_curves(epsilon, 'p2s', BLUE))

    # Parametrize open cells by cutting along one invariant meridian and a
    # separatrix graph v=b(u). This removes curves, not positive-width regions;
    # the small nonzero gaps here are ONLY a drawing convention.
    for key, boundary, cut_u, color in [('p4u', 'p3u', -np.pi/2, RED),
                                       ('p1s', 'p2s', np.pi/2, BLUE)]:
        us = np.linspace(cut_u+.04, cut_u+TAU-.04, 105)
        b = boundary_graph(epsilon, boundary, us)
        offsets = np.linspace(.035, TAU-.035, 65)
        u = np.broadcast_to(us, (len(offsets), len(us)))
        v = b[None, :]+offsets[:, None]
        cell = surface(u, v, epsilon, color)
        cut = np.column_stack([np.full(480, cut_u), np.linspace(0, TAU, 480)])
        limits = [curve(cut, epsilon, '#54636c', width=2)]
        for branch in separatrices(epsilon, boundary):
            limits.append(curve(resample(branch), epsilon, '#54636c', width=2))
        add(key, [cell, *limits])

    # Comparison uses coincident red/blue geometry when epsilon=0. A dashed
    # blue stroke leaves the red stroke visible without moving either curve.
    comparison = manifold_curves(epsilon, 'p3u', RED, with_arrows=False)
    comparison += manifold_curves(epsilon, 'p2s', BLUE, dash='dash', with_arrows=False)
    comparison += [marker([points[p]['u'], points[p]['v']], epsilon, c, 6)
                   for p, c in [('p3', RED), ('p2', BLUE)]]
    add('comparison', comparison)

    # Overview colors and the 26-degree angle follow the supplied
    # morse-smale-tilted-torus.html; individual selections still use blue/red.
    saddles = []
    for key, color in [('p3u', '#007F5F'), ('p3s', '#78AA22'),
                       ('p2s', '#D3299D'), ('p2u', '#6941C6')]:
        for i in groups[key]:
            trace = traces[i].to_plotly_json()
            if trace['type'] == 'scatter3d':
                trace['line']['color'] = color
                if key == 'p2s' and epsilon == 0:
                    trace['line']['dash'] = 'dash'
            elif trace['type'] == 'cone':
                trace['colorscale'] = [[0, color], [1, color]]
            saddles.append(trace)
    saddles += [marker([points[p]['u'], points[p]['v']], epsilon, '#514d57', 6)
                for p in ['p3', 'p2']]
    add('saddles', [go.Figure(data=[trace]).data[0] if isinstance(trace, dict)
                    else trace for trace in saddles])

    coords = np.array([xyz(p['u'], p['v'], epsilon) for p in points.values()])
    add('points', [go.Scatter3d(
        x=as_list(coords[:, 0]), y=as_list(coords[:, 1]), z=as_list(coords[:, 2]),
        mode='markers+text', text=['p₁','p₂','p₃','p₄'], textposition='middle right',
        textfont=dict(size=15, color='#34434b'), marker=dict(size=4.5, color='#34434b',
                       symbol='circle-open', line=dict(width=1.5)),
        customdata=[[p['name'], p['index']] for p in points.values()],
        hovertemplate='%{text}: %{customdata[0]}<br>Morse index %{customdata[1]}<extra></extra>',
        showlegend=False)])
    p = points['p4']
    add('selected', [marker([p['u'], p['v']], epsilon, RED)])
    payload_points = {key: {**p, 'xyz': [float(c) for c in xyz(p['u'], p['v'], epsilon)]}
                      for key, p in points.items()}
    return dict(epsilon=epsilon, points=payload_points, groups=groups,
                data=[trace.to_plotly_json() for trace in traces], descriptions=descriptions(epsilon))


def main():
    camera = dict(eye=dict(x=.78, y=-1.25, z=.40), up=dict(x=0, y=0, z=1),
                  projection=dict(type='perspective'))
    layout = dict(margin=dict(l=0, r=0, t=0, b=0), paper_bgcolor='#ffffff',
                  scene=dict(xaxis=dict(visible=False, range=[-2.9, 2.9]),
                             yaxis=dict(visible=False, range=[-1.8, 1.8]),
                             zaxis=dict(visible=False, range=[-2.9, 2.9]),
                             aspectmode='manual', aspectratio=dict(x=1, y=3.6/5.8, z=1),
                             camera=camera, bgcolor='#ffffff', dragmode='orbit'),
                  uirevision='morse-torus', showlegend=False,
                  font=dict(family='Arial, sans-serif', color='#34434b'))
    model = dict(camera=camera, layout=layout,
                 variants={'naive': build_variant(0.0), 'tilted': build_variant(TILT)})
    payload = json.dumps(model, cls=PlotlyJSONEncoder, separators=(',', ':'), allow_nan=False)
    template = (HERE/'template.html').read_text(encoding='utf-8')
    assert '/* MODEL */' in template
    html = template.replace('/* MODEL */', payload)
    dest = ROOT/'assets/interactive/morse-torus.html'
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html, encoding='utf-8')
    print(f'Generated {dest.relative_to(ROOT)} ({len(html.encode()):,} bytes)')


if __name__ == '__main__':
    main()
