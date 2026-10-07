"""Generate the static, interactive Morse-theory illustration.

From the repository root:
    python -m pip install numpy plotly==6.3.1
    python scripts/morse_torus/generate.py

The browser runs the exported Plotly figure, not a Python server.
See README.md in this directory for the mathematical conventions.
"""

from pathlib import Path
import json

import numpy as np
import plotly.graph_objects as go
from plotly.utils import PlotlyJSONEncoder

R, r = 2.0, 0.68
TAU = 2 * np.pi
BLUE, RED, GREY = "#2267a5", "#bd4937", "#b5bbc0"
ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent


def xyz(u, v, lift=0):
    """The upright torus, with axis along y and height f = z."""
    u, v = np.broadcast_arrays(u, v)
    tube = r + lift
    return ((R + tube * np.cos(v)) * np.cos(u),
            tube * np.sin(v), (R + tube * np.cos(v)) * np.sin(u))


def field(q):
    """Negative gradient with respect to the induced Euclidean metric."""
    u, v = q
    return np.array([-np.cos(u) / (R + r * np.cos(v)),
                     np.sin(v) * np.sin(u) / r])


def trajectory(seed, direction):
    q = np.array(seed, dtype=float)
    points = [q.copy()]
    dt = 0.035 * direction
    for step in range(2600):
        k1 = field(q)
        if np.linalg.norm(k1) < 1e-6:
            break
        k2 = field(q + dt * k1 / 2)
        k3 = field(q + dt * k2 / 2)
        k4 = field(q + dt * k3)
        q += dt * (k1 + 2 * k2 + 2 * k3 + k4) / 6
        if step % 5 == 0:
            points.append(q.copy())
    points.append(q.copy())
    return np.array(points)


def as_list(a):
    return np.asarray(a).round(6).tolist()


def surface(u, v, color, opacity=1):
    u, v = np.meshgrid(u, v)
    x, y, z = xyz(u, v)
    # Analytic Lambert shading keeps the shape legible in software WebGL too.
    light = np.array([-.5, -1., 1.3]); light /= np.linalg.norm(light)
    shade = np.maximum(np.cos(u)*np.cos(v)*light[0] + np.sin(v)*light[1]
                       + np.sin(u)*np.cos(v)*light[2], 0)
    rgb = np.array([int(color[i:i+2],16) for i in (1,3,5)])
    dark = 'rgb(%d,%d,%d)' % tuple((rgb*.68).astype(int))
    pale = 'rgb(%d,%d,%d)' % tuple((rgb+(255-rgb)*.72).astype(int))
    return go.Surface(
        x=as_list(x), y=as_list(y), z=as_list(z),
        surfacecolor=as_list(shade), cmin=0, cmax=1,
        colorscale=[[0, dark], [1, pale]], showscale=False,
        opacity=opacity, hoverinfo="skip", showlegend=False,
        lighting=dict(ambient=1, diffuse=0, roughness=1, specular=0, fresnel=0),
        lightposition=dict(x=-8, y=-10, z=12),
        contours=dict(x=dict(show=False), y=dict(show=False), z=dict(show=False)),
    )


def curve(u, v, color, width=7, name=""):
    x, y, z = xyz(u, v, lift=.012)
    return go.Scatter3d(x=as_list(x), y=as_list(y), z=as_list(z),
                        mode="lines", line=dict(color=color, width=width),
                        hoverinfo="skip", showlegend=False, name=name)


POINTS = {
    "p1": dict(u=3*np.pi/2, v=0, index=0, name="Minimum"),
    "p2": dict(u=3*np.pi/2, v=np.pi, index=1, name="Lower saddle"),
    "p3": dict(u=np.pi/2, v=np.pi, index=1, name="Upper saddle"),
    "p4": dict(u=np.pi/2, v=0, index=2, name="Maximum"),
}


def arrows(uv, color, size=.08):
    """Arrows tangent to -grad(f), in the ambient coordinates."""
    uv = np.asarray(uv)
    x, y, z = xyz(uv[:, 0], uv[:, 1], lift=.012)
    vectors = []
    for u, v in uv:
        du, dv = field([u, v])
        xu = np.array([-(R+r*np.cos(v))*np.sin(u), 0,
                       (R+r*np.cos(v))*np.cos(u)])
        xv = np.array([-r*np.sin(v)*np.cos(u), r*np.cos(v),
                       -r*np.sin(v)*np.sin(u)])
        vel = du*xu + dv*xv
        vectors.append(vel / np.linalg.norm(vel))
    vectors = np.asarray(vectors)
    return go.Cone(x=as_list(x), y=as_list(y), z=as_list(z),
                   u=as_list(vectors[:, 0]), v=as_list(vectors[:, 1]),
                   w=as_list(vectors[:, 2]), colorscale=[[0,color],[1,color]],
                   showscale=False, sizemode="absolute", sizeref=size,
                   anchor="center", hoverinfo="skip", showlegend=False)


def main():
    traces, groups = [], {}

    def add_group(name, items):
        groups[name] = list(range(len(traces), len(traces) + len(items)))
        traces.extend(items)

    # This neutral surface provides context; it is not the selected manifold.
    add_group("base", [surface(np.linspace(0, TAU, 101),
                                np.linspace(0, TAU, 61), "#d4d8dc", 1)])

    # Sample trajectories with RK4. Thin lines are individual flow lines.
    coords = [[], [], []]
    for u in [-1.0, .15, 1.0, 2.15, 3.15, 4.1]:
        for v in [-.85, .85]:
            seed = [u, v]
            uv = np.concatenate([trajectory(seed, -1)[::-1],
                                 trajectory(seed, 1)[1:]])
            for axis, values in zip(coords, xyz(uv[:,0], uv[:,1], lift=.014)):
                axis.extend(as_list(values)); axis.append(None)
    add_group("flows", [go.Scatter3d(
        x=coords[0], y=coords[1], z=coords[2], mode="lines",
        line=dict(color="#5b6570", width=3), opacity=1,
        hoverinfo="skip", showlegend=False)])

    # Zero-dimensional manifolds are precisely their critical point.
    for key, mode, color in [("p1", "u", RED), ("p4", "s", BLUE)]:
        p = POINTS[key]
        x, y, z = xyz([p["u"]], [p["v"]])
        add_group(key+mode, [go.Scatter3d(
            x=as_list(x), y=as_list(y), z=as_list(z), mode="markers",
            marker=dict(size=9, color=color), hoverinfo="skip", showlegend=False)])

    # The selected saddle is included, its limiting critical points excluded.
    eps = .035
    for key, mode, color, u in [("p3", "s", BLUE, np.pi/2),
                               ("p2", "u", RED, 3*np.pi/2)]:
        vs = np.linspace(eps, TAU-eps, 181)
        add_group(key+mode, [curve(u, vs, color),
                            arrows([[u, np.pi/2], [u, 3*np.pi/2]], color)])
    for key, mode, color, excluded in [("p3", "u", RED, 3*np.pi/2),
                                      ("p2", "s", BLUE, np.pi/2)]:
        us = np.linspace(excluded+eps, excluded+TAU-eps, 241)
        add_group(key+mode, [curve(us, np.pi, color),
                            arrows([[0, np.pi], [np.pi, np.pi]], color)])

    # Two-dimensional open cells: remove the inner equator and one meridian.
    # Small display gaps separate the selected cell from its excluded curves.
    gap = .055
    for key, mode, color, excluded_u in [("p4", "u", RED, 3*np.pi/2),
                                        ("p1", "s", BLUE, np.pi/2)]:
        cell = surface(np.linspace(excluded_u+gap, excluded_u+TAU-gap, 101),
                       np.linspace(np.pi+gap, 3*np.pi-gap, 61), color, 1)
        boundaries = [curve(np.linspace(0, TAU, 241), np.pi, "#39434d", 3),
                      curve(excluded_u, np.linspace(0, TAU, 181), "#39434d", 3)]
        add_group(key+mode, [cell, *boundaries])

    # A hollow symbol marks every unselected critical point. The selected point
    # becomes filled in the controls, including for the one- and two-cells.
    xs, ys, zs = [], [], []
    for key, p in POINTS.items():
        x,y,z=xyz(p["u"], p["v"])
        xs.append(float(x)); ys.append(float(y)); zs.append(float(z))
    add_group("points", [go.Scatter3d(
        x=xs, y=ys, z=zs, mode="markers+text", text=["p₁", "p₂", "p₃", "p₄"],
        textposition="middle right", textfont=dict(size=17, color="#17202a"),
        marker=dict(size=5, color="#17202a", symbol="circle-open", line=dict(width=2)),
        customdata=[[p["name"], p["index"]] for p in POINTS.values()],
        hovertemplate="%{text}: %{customdata[0]}<br>Morse index %{customdata[1]}<extra></extra>",
        showlegend=False)])
    selected = POINTS["p4"]
    x,y,z=xyz([selected["u"]], [selected["v"]])
    add_group("selected", [go.Scatter3d(
        x=as_list(x), y=as_list(y), z=as_list(z), mode="markers",
        marker=dict(size=6, color=RED), hoverinfo="skip", showlegend=False)])

    initial = set(groups["flows"] + groups["p4u"]
                  + groups["points"] + groups["selected"])
    for i, trace in enumerate(traces):
        trace.visible = i in initial
    fig = go.Figure(traces)
    camera = dict(eye=dict(x=1.5,y=-2.5,z=.8), up=dict(x=0,y=0,z=1),
                  projection=dict(type="orthographic"))
    fig.update_layout(
        margin=dict(l=0,r=0,t=0,b=0), paper_bgcolor="#ffffff",
        scene=dict(xaxis=dict(visible=False), yaxis=dict(visible=False),
                   zaxis=dict(visible=False), aspectmode="data", camera=camera,
                   bgcolor="#ffffff", dragmode="orbit"),
        uirevision="morse-torus", showlegend=False,
        font=dict(family="Arial, sans-serif",color="#17202a"),
    )
    fragment = fig.to_html(full_html=False, include_plotlyjs="cdn",
                           div_id="morse-plot", default_height="100%",
                           config=dict(responsive=True, displayModeBar=False,
                                       scrollZoom=False))
    point_data = {key: {**p, "xyz": [float(c) for c in xyz(p["u"],p["v"])]}
                  for key,p in POINTS.items()}
    payload = json.dumps(dict(groups=groups, points=point_data, camera=camera),
                         cls=PlotlyJSONEncoder)
    template = (HERE / "template.html").read_text()
    html = template.replace("<!-- PLOT -->", fragment).replace("/* MODEL */", payload)
    dest = ROOT / "assets/interactive/morse-torus.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html, encoding="utf-8")
    print(f"Generated {dest.relative_to(ROOT)} ({len(html.encode()):,} bytes)")


if __name__ == "__main__":
    main()
