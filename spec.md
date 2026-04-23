# rendervid spec — "mcp-in-action"

A 45-second rendervid (1920×1080, 30fps, 1350 frames) explaining how Claude Code uses Playwright MCP to drive a real browser. Brand palette: FlowHunt blue gradient `linear-gradient(90deg, #0084FF, #1A56DB)`.

## Scene 1 — Hook (0:00–0:03 · frames 0–90 · 90f)

Background: solid white `#FFFFFF`.

One layer only: centered headline **"Your terminal can drive the browser."** — Inter 84px, weight 700, color `#111928`, max-width 1400px, line-height 1.15. Positioned at canvas center (960, 540).

The word "drive" is set in the FlowHunt blue gradient (text-fill using `linear-gradient(90deg, #0084FF, #1A56DB)`). All other words are `#111928`.

**Animation:**
- Frames 0–20: whole headline fades in from opacity 0 → 1, scales from 0.96 → 1.0, ease-out
- Frames 20–75: hold, no motion
- Frames 75–90: fades out to opacity 0 (no scale change), ease-in

**Transition to Scene 2:** crossfade. Scene 1 fades out frames 75–90 while Scene 2's background is already `#FFFFFF`, so it reads as a clean hold-and-release rather than a cut.

## Scene 2 — Problem (0:03–0:09 · frames 90–270 · 180f)

Background: solid white `#FFFFFF`.

Layout: 50/50 vertical split. Left half centered around (480, 540), right half centered around (1440, 540). A thin vertical divider line at `x=960, y=340 to y=740`, stroke `#E5E7EB`, 1px — appears at frame 90, instant.

**Left panel — "vision = slow, brittle":**
- Layer A: magnifying-glass SVG icon (simple outline, stroke `#6B7280`, 2px, size 120×120), centered at (480, 440)
- Layer B: below the icon, label text "Vision models" (Inter 28px, weight 600, color `#111928`), centered at (480, 560)
- Layer C: sub-label "slow · unreliable" (Inter 20px, weight 400, color `#6B7280`), centered at (480, 598)
- Layer D: a big red X (two diagonal strokes, color `#EF4444`, 4px stroke, 160×160) overlaying the magnifying glass, appearing at frame 180

**Right panel — "selectors = brittle":**
- Layer E: monospace text block showing a gnarly CSS selector `#root > div.app-shell > main > div:nth-child(3) > form > input` (JetBrains Mono 18px, color `#374151`, wraps to two lines max, centered at (1440, 440))
- Layer F: label "CSS selectors" (Inter 28px, weight 600, `#111928`, centered at (1440, 560))
- Layer G: sub-label "break on redesign" (Inter 20px, weight 400, `#6B7280`, centered at (1440, 598))
- Layer H: red X same spec as Layer D, overlaying the selector at frame 180

**Animation:**
- Frames 90–110: left and right panels fade in together (opacity 0 → 1), magnifying glass and selector text scale from 0.95 → 1.0, ease-out
- Frames 110–180: hold
- Frames 180–200: both red Xs draw themselves — two strokes per X, each stroke animates from 0% to 100% length over 10 frames (total 20f for both strokes), ease-out. Xs fade in from opacity 0 to 1 simultaneously with the stroke draw.
- Frames 200–250: hold with Xs visible
- Frames 250–270: everything on screen fades out to opacity 0, ease-in

**Transition to Scene 3:** straight fade to white through frames 250–270, then Scene 3 fades in from frame 270.

## Scene 3 — Pivot (0:09–0:14 · frames 270–420 · 150f)

Background: white.

One element, big and centered: the phrase **"Playwright MCP"** in Inter 120px, weight 700. The word "MCP" is in FlowHunt blue gradient, "Playwright" is in `#111928`. Positioned at canvas center (960, 540).

Below it, a supporting line "built for AI agents like Claude Code" in Inter 28px, weight 400, `#6B7280`, centered at (960, 620). Appears at frame 330.

**Animation:**
- Frames 270–290: "Playwright MCP" appears — each word fades in from opacity 0 → 1 AND translates up 20px to final position, ease-out. "Playwright" animates frames 270–285, "MCP" animates frames 280–295 (slight stagger so MCP lands second).
- Frames 295–330: hold
- Frames 330–345: supporting line fades in, translates up 12px, ease-out
- Frames 345–400: hold
- Frames 400–420: everything fades out opacity 1 → 0, AND the whole composition scales from 1.0 → 1.05 (subtle zoom-out feeling as it departs), ease-in

**Transition to Scene 4:** crossfade frames 400–420 (Scene 3 fading out while Scene 4 fades in underneath on white).

## Scene 4 — Architecture (0:14–0:24 · frames 420–720 · 300f)

Background: white.

Three boxes left-to-right, two rows of arrows between them.

**Box coordinates (centers):**
- Box 1 (Claude Code): center (320, 540), size 360×260, corner radius 16, fill `#F9FAFB`, stroke `#D1D5DB` 2px
- Box 2 (Playwright MCP): center (960, 540), size 360×260, same styling
- Box 3 (Browser): center (1600, 540), size 360×260, same styling

**Box contents:**
- **Box 1:** terminal icon (rounded rect outline 120×76 at y-offset -40 from box center, with `>_` prompt glyph inside in mono 28px), then label "Claude Code" Inter 32px weight 600 at y-offset +30, then sub-label "your terminal" Inter 18px weight 400 `#6B7280` at y-offset +70
- **Box 2:** server-rack icon (two stacked rounded rects 120×22 each with small green `#22C55E` dots on the left), then label "Playwright MCP" 32px 600, then sub-label "npx @playwright/mcp" JetBrains Mono 16px `#6B7280`
- **Box 3:** browser-window icon (rounded rect 140×76 with tab bar and three dots in the corner), then label "Browser" 32px 600, then sub-label "Chromium · Firefox · WebKit" 18px `#6B7280`

**Arrows:**
- Top row (left-to-right, FlowHunt blue `#0084FF`): Arrow A from Box 1 right edge to Box 2 left edge, Arrow B from Box 2 right edge to Box 3 left edge. 3px stroke, arrowhead triangle 12×12 at end. Label above Arrow A: "tool calls" Inter 18px weight 600 `#0084FF`. Label above Arrow B: "Playwright API" same spec.
- Bottom row (right-to-left, slate `#475569`): Arrow C from Box 2 left edge to Box 1 right edge, Arrow D from Box 3 left edge to Box 2 right edge. Same 3px stroke, arrowhead. Label below Arrow C: "accessibility snapshot" 18px 600 `#475569`. Label below Arrow D: "page state" same spec.

**Animation sequence (300 frames total):**
- Frames 420–460 (40f): Box 1 fades in and scales from 0.9 → 1.0, ease-out
- Frames 450–490 (40f, overlap): Box 2 fades in and scales (staggered by 30f after Box 1)
- Frames 480–520 (40f, overlap): Box 3 fades in and scales (staggered by 30f after Box 2)
- Frames 530–560 (30f): Arrow A draws itself left-to-right (stroke-dashoffset animation from full to zero), label "tool calls" fades in over last 10f of draw
- Frames 560–590 (30f): Arrow B draws itself left-to-right, label fades in
- Frames 600–630 (30f): Arrow C draws itself right-to-left, label fades in
- Frames 630–660 (30f): Arrow D draws itself right-to-left, label fades in
- Frames 660–700 (40f): hold — the diagram is now fully drawn
- Frames 700–720 (20f): whole composition fades to opacity 0, ease-in

**Transition to Scene 5:** crossfade frames 700–720. Architecture dissolves; terminal in Scene 5 fades in underneath.

## Scene 5 — Install (0:24–0:30 · frames 720–900 · 180f)

Background: white.

Layout: one big faux-terminal window, centered, size 1400×400, at canvas center (960, 540). Terminal styling: background `#1F2937`, corner radius 12, with a macOS-style title bar — three circles top-left (red `#EF4444`, yellow `#F59E0B`, green `#22C55E`, 10px radius each, 16px apart, 20px from left edge, 20px from top). Thin divider line below title bar at `y=36` from top of terminal, `#374151` 1px.

**Inside the terminal:**
- Line 1 (at `y=84` from top of terminal): prompt `$` in `#6B7280` JetBrains Mono 22px, followed by typing text `claude mcp add playwright npx @playwright/mcp@latest` in `#E5E7EB` JetBrains Mono 22px
- Line 2 (at `y=150` from top): success message `✓ Connected: playwright` in `#22C55E` JetBrains Mono 22px
- Line 3 (at `y=200` from top): `Tools available: navigate, click, type, screenshot, +17 more` in `#9CA3AF` JetBrains Mono 18px
- Line 4 (at `y=260` from top): blinking cursor `▋` in `#E5E7EB` JetBrains Mono 22px

**Animation:**
- Frames 720–740 (20f): terminal window fades in + scales 0.95 → 1.0, ease-out
- Frames 740–810 (70f): Line 1 command types itself character by character. The command is 51 chars — ~1.4 chars per frame. Prompt "$ " appears at frame 740 instantly, command chars start at 742.
- Frames 815–830 (15f): Line 2 appears — the ✓ scales from 0 → 1 with ease-out spring-ish curve (use standard ease-out, not a real spring), while the text fades in simultaneously
- Frames 830–840 (10f): Line 3 fades in
- Frames 840–900 (60f): hold, cursor on Line 4 blinks on/off every 15f (4 cycles over the 60 frames)

**Transition to Scene 6:** the terminal doesn't disappear — it morphs. Frames 880–920 (overlapping with Scene 5's end and Scene 6's start): the terminal scales down from full width to 50% width AND translates left to become the left pane of Scene 6. Simultaneously, the right pane of Scene 6 fades in at full size. This gives continuity — the install moment flows directly into the explanation of what it enables.

## Scene 6 — Snapshot magic (0:30–0:40 · frames 900–1200 · 300f)

Background: white.

Layout: 50/50 split. Left pane centered at (480, 540), size 720×520, dark panel style (same `#1F2937` as the terminal that morphed from Scene 5). Right pane centered at (1440, 540), size 720×520, light panel style: fill `#FFFFFF`, stroke `#E5E7EB` 1.5px, corner radius 12.

**Above each pane, a small uppercase label:**
- Left label at (480, 220): "WHAT CLAUDE READS" Inter 14px weight 700 `#6B7280`, letter-spacing 1.5px
- Right label at (1440, 220): "WHAT YOU SEE" same spec

**Left pane contents** (snapshot text in JetBrains Mono 18px, line-height 28px):
```
- heading "todos" [level=1]
- textbox "What needs to be done?" [ref=e5]
- listitem:
    - checkbox "Toggle Todo" [ref=e10]
    - text: "Buy groceries"
```
Color coding: `[ref=e5]` and `[ref=e10]` tokens are `#FBBF24` weight 600. Everything else is `#E5E7EB`.

**Right pane contents** (stylized TodoMVC-ish):
- "todos" header: 72px weight 200, color `#FDE2E2`, centered at top of pane
- Input field: rounded rect 600×44, fill white, stroke `#EDEDED` 1px, with placeholder "What needs to be done?" in Inter 18px italic `#BFBFBF`
- Three todo rows below, each 600px wide with 1px `#EDEDED` divider above: circle checkbox (22px, stroke `#CCCCCC` 1.5px, no fill) + todo text in Inter 18px `#4D4D4D`
- Todo texts: "Buy groceries", "Walk the dog", "Ship the blog"

**Animation choreography (this is the payoff scene — spend the frames well):**
- Frames 900–920 (20f): both labels fade in
- Frames 920–940 (20f): right pane's header + empty input field fade in
- Frames 940–1080 (140f): paired reveal — snapshot lines appear on the left AS the corresponding UI elements appear on the right. Specifically:
  - 940–970: left Line 1 (`- heading "todos"`) types in (fade-in per line, not char-by-char, since char-by-char at this font size gets busy)
  - 940–970: right "todos" header is already visible, but it pulses briefly (scale 1.0 → 1.03 → 1.0 over 30f) to acknowledge the snapshot line referencing it
  - 980–1010: left Line 2 (`textbox ... [ref=e5]`) fades in. On line completion, the `[ref=e5]` token in amber gets a 10-frame glow (drop-shadow opacity 0 → 0.6 → 0 with blur 16px, color `#FBBF24`). SIMULTANEOUSLY the right pane's input field gets a blue focus ring drawn around it (stroke `#0084FF` 2px, opacity 0 → 1 over 15f, held for 15f, opacity 1 → 0 over 15f)
  - 1020–1050: left Line 3 and Line 4 (`- listitem:` and `- checkbox [ref=e10]`) fade in together. `[ref=e10]` gets the same amber glow.
  - 1040–1080: three todo rows on the right appear one at a time (rows fade in + translate up 8px each, staggered by 13 frames: row 1 at frame 1040, row 2 at 1053, row 3 at 1066). As each row appears, its text types in character-by-character over the row's own 15-frame entrance window.
- Frames 1080–1160 (80f): everything holds, visible and readable
- Frames 1160–1200 (40f): both panes fade to opacity 0, ease-in

**Transition to Scene 7:** crossfade to white during frames 1160–1200. Panes dissolve; CTA fades in.

## Scene 7 — CTA (0:40–0:45 · frames 1200–1350 · 150f)

Background: white.

**Layout, top-to-bottom centered column:**
- FlowHunt logo (SVG) at (960, 380), scaled to width 300px (height auto ≈ 63px)
- Divider: horizontal line 200px wide, 1px stroke `#E5E7EB`, at `y=480`
- Blog title text at (960, 560): "How to Use Claude Code with Playwright MCP" Inter 44px weight 700 `#111928`, max-width 1400px, centered
- Sub-line at (960, 620): "A complete setup guide" Inter 24px weight 400 `#6B7280`
- CTA pill button at (960, 720): rounded rect 320×64, corner radius 32, filled with FlowHunt blue gradient `linear-gradient(90deg, #0084FF, #1A56DB)`. Text inside: "Read the guide →" Inter 22px weight 600 white, centered.
- URL text at (960, 820): "flowhunt.io/blog" Inter 20px weight 500 `#6B7280`. ← **TODO: confirm this URL**

**Animation:**
- Frames 1200–1220 (20f): logo fades in + translates up 12px to final position, ease-out
- Frames 1220–1235 (15f): divider line draws left-to-right from center outward (scaleX 0 → 1 from center origin)
- Frames 1235–1255 (20f): blog title + sub-line fade in together, translate up 12px, ease-out
- Frames 1260–1280 (20f): CTA button fades in + scales 0.9 → 1.0, ease-out
- Frames 1280–1350 (70f): hold. During this hold, the arrow inside the CTA button nudges right and back (`translateX 0 → 4px → 0`) on a 40-frame loop — draws the eye, signals clickability.
- Frames 1320–1350 (30f): URL text fades in gently

Final frame (1350) freezes on the full composition for any thumbnail/poster-frame extraction.

## Transitions summary

| Between | Type | Frame range | Notes |
|---------|------|-------------|-------|
| S1 → S2 | Crossfade on white | 75–90 | Scene 1 fades out; Scene 2 panels fade in on the same white ground |
| S2 → S3 | Crossfade on white | 250–290 | Clean fade through white |
| S3 → S4 | Crossfade + subtle zoom | 400–440 | S3 scales 1.0 → 1.05 as it fades; S4 fades in at 1.0 |
| S4 → S5 | Crossfade on white | 700–740 | Diagram dissolves; terminal appears at full size |
| S5 → S6 | Morph cut | 880–920 | Terminal scales down 50% + translates left to become S6's left pane. Right pane fades in. This is the only "motion" transition — it's worth the extra complexity because it carries meaning ("what you installed becomes what Claude reads from") |
| S6 → S7 | Crossfade on white | 1160–1200 | Clean fade |
