# Pack de prompts Higgsfield — Visuales web Ansaire

Dirección de arte común a todo el pack (para que todos los visuales parezcan de la misma "película"):
edificio residencial moderno **en construcción en Málaga**, hora dorada, grading **teal & gold** (encaja con el dorado `#c8a84b` de la marca), lente anamórfica 35mm, grano de película fino, estilo secuencia de apertura de Denis Villeneuve / A24.

**Dónde guardar cada asset** (la web los detecta automáticamente):

| Asset | Ruta en el repo |
|---|---|
| Vídeo hero | `assets/hero-video.mp4` |
| Póster / still del hero | `assets/hero-poster.jpg` (opcional) |
| Imágenes extra de galería | `assets/galeria/05.jpg` … `08.jpg` |

---

## 1. HERO VIDEO — el prompt principal ⭐

> Formato 16:9 · 5–10 s · loop-friendly · camera motion: **Crane Up + Dolly In**

```
Cinematic aerial establishing shot slowly craning upward at golden hour over a
modern luxury residential building under construction in Málaga, Spain. Exposed
concrete skeleton with an elegant partially-installed glass facade, two tower
cranes silhouetted against a warm amber sky, scaffolding catching the last rays
of sunlight. In the background, the Mediterranean Sea glitters and the Málaga
skyline glows softly in haze. Fine dust particles float through volumetric god
rays between the floors; a few construction workers appear as tiny silhouettes
on the upper slab. Shot on a 35mm anamorphic lens, shallow depth of field,
teal and gold color grading, subtle fine film grain, smooth and slow camera
movement: crane up combined with a gentle push-in. Epic yet serene atmosphere,
in the style of a Denis Villeneuve opening sequence. Seamless loop, no text,
no logos.
```

**Negative prompt:**

```
text, watermark, logo, subtitles, distorted geometry, bent crane, warped
scaffolding, extra limbs, deformed people, oversaturated colors, cartoon,
video game render, CGI look, jittery motion, low quality, blurry
```

---

## 2. HERO POSTER (still de la misma escena)

> Formato 16:9 · sirve de póster del vídeo y de fallback

```
Cinematic wide-angle photograph at golden hour of a modern luxury residential
building under construction in Málaga, Spain: exposed concrete skeleton,
partially-installed floor-to-ceiling glass facade reflecting an amber sky, two
tower cranes in silhouette, scaffolding rim-lit by the setting sun, the
Mediterranean Sea and Málaga skyline hazy in the background. Volumetric light,
dust particles in the air, 35mm anamorphic lens, shallow depth of field, teal
and gold color grade, fine film grain, epic and serene, no text, no logos.
```

---

## 3. GALERÍA — 4 imágenes de apoyo (formato 4:5)

**3a. Detalle de ferralla al atardecer**

```
Extreme close-up macro photograph of steel rebar lattice on a construction
site in Málaga at golden hour, warm sunlight flaring between the corroded
steel bars, bokeh of a tower crane in the far background, shallow depth of
field, anamorphic lens flare, teal and gold cinematic grade, fine film grain,
no text, no logos.
```

**3b. Operarios en silueta**

```
Cinematic backlit shot of two construction workers in hard hats standing on a
raw concrete slab of an unfinished modern building in Málaga, silhouetted
against a blazing golden sunset over the Mediterranean Sea, dramatic rim
light, dust in the air catching the light, 35mm anamorphic, teal and gold
grade, film grain, heroic and quiet mood, no text, no logos.
```

**3c. Fachada con andamios reflejando el mar**

```
Low-angle cinematic photograph of a modern residential facade under
construction in Málaga: fresh floor-to-ceiling glass panels reflecting the
golden Mediterranean Sea and sky, scaffolding and safety nets on one side,
warm sunset light raking across raw concrete balconies, anamorphic lens,
teal and gold color grade, fine film grain, no text, no logos.
```

**3d. Esqueleto del edificio a la hora azul**

```
Cinematic dusk photograph of the concrete skeleton of a modern building under
construction in Málaga at blue hour, warm tungsten work lights glowing on
each floor contrasting with the deep blue sky, a tower crane crowned by a
red aircraft light, the city lights of Málaga bokeh in the background,
long-exposure feel, teal and gold grade, film grain, no text, no logos.
```

---

## Consejos de ajustes en Higgsfield

- **Vídeo**: usa un preset cinematográfico y movimientos de cámara *Crane Up* o *Dolly In* (evita FPV rápidos: el hero pide movimiento lento y majestuoso). Si permite duración, pide 8–10 s para que el loop respire.
- **Loop**: si el resultado no cierra bien el bucle, genera 2–3 variantes y elige la de movimiento más constante; la web lo reproduce en `loop` y los cortes se notan.
- **Peso**: exporta el mp4 a 1080p (H.264). Ideal < 8 MB para que el hero cargue rápido; si pesa más, recomprime con `ffmpeg -i in.mp4 -vcodec libx264 -crf 28 -an hero-video.mp4`.
- **Imágenes**: genera en 4:5 para la galería y 16:9 para el póster; exporta JPG de calidad 80–85.
