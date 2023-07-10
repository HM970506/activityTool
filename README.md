## new_diaryactivitytool

인턴과제 프로젝트 | 활동툴

```
new_diaryactivitytool
├─ public
│  ├─ background
│  ├─ button
│  │  ├─ deleteButton.png
│  │  └─ editButton.png
│  ├─ decoration
│  │  ├─ decorate.png
│  │  ├─ stamp.png
│  │  ├─ tape.png
│  │  └─ template.png
│  ├─ drawtools
│  │  ├─ crayon.png
│  │  ├─ eraser.png
│  │  ├─ feltpen.png
│  │  ├─ highlighter.png
│  │  ├─ pattern.jpg
│  │  ├─ pencil.png
│  │  ├─ spray.png
│  │  ├─ thumbnail_crayon.png
│  │  ├─ thumbnail_eraser.png
│  │  ├─ thumbnail_feltpen.png
│  │  ├─ thumbnail_highlighter.png
│  │  └─ thumbnail_spray.png
│  ├─ filter
│  │  ├─ Brownie.PNG
│  │  ├─ GrayScale.PNG
│  │  ├─ Kodachrome.PNG
│  │  ├─ Ordinary.PNG
│  │  ├─ Polaroid.PNG
│  │  ├─ Sepia.PNG
│  │  ├─ Technicolor.PNG
│  │  └─ Vintage.PNG
│  ├─ frame
│  │  ├─ heart.png
│  │  ├─ hexagon.png
│  │  ├─ lightning.png
│  │  └─ star.png
│  ├─ index
│  │  └─ document.png
│  ├─ index.html
│  ├─ object
│  ├─ photo
│  │  ├─ camera.png
│  │  ├─ confirm_chk.png
│  │  ├─ gallery.png
│  │  └─ photo.png
│  ├─ recorder
│  │  ├─ pause.png
│  │  ├─ play.png
│  │  ├─ player.png
│  │  ├─ record.png
│  │  ├─ stop.png
│  │  ├─ voiceoff.png
│  │  └─ voiceon.png
│  ├─ sticker
│  │  └─ sticker.png
│  ├─ text
│  │  └─ bubble.png
│  └─ _redirects
├─ README.md
├─ rollup.config.js
├─ src
│  ├─ components
│  │  ├─ api
│  │  │  ├─ firestore
│  │  │  │  ├─ getData.tsx
│  │  │  │  ├─ setData.tsx
│  │  │  │  └─ setting.tsx
│  │  │  └─ greenEye.tsx
│  │  └─ newactivitytool
│  │     ├─ backButton
│  │     │  ├─ index.tsx
│  │     │  ├─ style.ts
│  │     │  └─ svg
│  │     │     └─ close.svg
│  │     ├─ canvas
│  │     │  ├─ brushes
│  │     │  │  ├─ crayon_brush.ts
│  │     │  │  ├─ index.tsx
│  │     │  │  ├─ ink_brush.ts
│  │     │  │  └─ marker_brush.ts
│  │     │  ├─ canvas.tsx
│  │     │  ├─ canvasSetting.tsx
│  │     │  ├─ fabricSetting.tsx
│  │     │  ├─ functionSetting.tsx
│  │     │  └─ windowSetting.tsx
│  │     ├─ common
│  │     │  ├─ colorbox
│  │     │  │  ├─ colorbox.tsx
│  │     │  │  └─ styled.ts
│  │     │  ├─ deleteButton
│  │     │  │  └─ deleteButton.tsx
│  │     │  ├─ editControlHandler.tsx
│  │     │  ├─ otherClick.tsx
│  │     │  ├─ saveFunction.tsx
│  │     │  ├─ selectHandler.tsx
│  │     │  └─ sizebox.ts
│  │     ├─ downbuttons
│  │     │  ├─ decoration
│  │     │  │  ├─ decorations.tsx
│  │     │  │  ├─ index.tsx
│  │     │  │  ├─ sizebox.ts
│  │     │  │  ├─ stamp.tsx
│  │     │  │  ├─ svg
│  │     │  │  │  └─ tape
│  │     │  │  │     ├─ tape1.svg
│  │     │  │  │     ├─ tape2.svg
│  │     │  │  │     ├─ tape3.svg
│  │     │  │  │     ├─ tape4.svg
│  │     │  │  │     └─ tape5.svg
│  │     │  │  ├─ tape.tsx
│  │     │  │  └─ template.tsx
│  │     │  ├─ drawTools
│  │     │  │  ├─ datas.tsx
│  │     │  │  ├─ drawOption.tsx
│  │     │  │  ├─ drawTools.tsx
│  │     │  │  ├─ index.tsx
│  │     │  │  ├─ style.ts
│  │     │  │  └─ svg
│  │     │  │     ├─ line
│  │     │  │     │  ├─ line1.svg
│  │     │  │     │  ├─ line2.svg
│  │     │  │     │  ├─ line3.svg
│  │     │  │     │  ├─ line4.svg
│  │     │  │     │  └─ line5.svg
│  │     │  │     └─ spray
│  │     │  │        ├─ spray1.svg
│  │     │  │        ├─ spray2.svg
│  │     │  │        ├─ spray3.svg
│  │     │  │        ├─ spray4.svg
│  │     │  │        └─ spray5.svg
│  │     │  ├─ index.tsx
│  │     │  ├─ photo
│  │     │  │  ├─ index.tsx
│  │     │  │  ├─ photo.tsx
│  │     │  │  ├─ photoChecker.tsx
│  │     │  │  ├─ photoEditor
│  │     │  │  │  ├─ cropper.tsx
│  │     │  │  │  ├─ filters.tsx
│  │     │  │  │  ├─ free.tsx
│  │     │  │  │  ├─ index.tsx
│  │     │  │  │  ├─ ratio.tsx
│  │     │  │  │  ├─ shapes.tsx
│  │     │  │  │  ├─ style.ts
│  │     │  │  │  └─ svg
│  │     │  │  │     ├─ cut.svg
│  │     │  │  │     ├─ diagram.svg
│  │     │  │  │     ├─ filter.svg
│  │     │  │  │     ├─ free.svg
│  │     │  │  │     ├─ ratio1.svg
│  │     │  │  │     ├─ ratio2.svg
│  │     │  │  │     ├─ ratio3.svg
│  │     │  │  │     ├─ ratio4.svg
│  │     │  │  │     └─ refrash.svg
│  │     │  │  └─ style.ts
│  │     │  ├─ record
│  │     │  │  ├─ index.tsx
│  │     │  │  ├─ record.tsx
│  │     │  │  └─ style.ts
│  │     │  ├─ sticker
│  │     │  │  ├─ index.tsx
│  │     │  │  ├─ sticker.tsx
│  │     │  │  └─ style.ts
│  │     │  ├─ style.ts
│  │     │  └─ text
│  │     │     ├─ index.tsx
│  │     │     ├─ style.ts
│  │     │     └─ text.tsx
│  │     ├─ index.tsx
│  │     ├─ MeatballsMenuButton
│  │     │  ├─ index.tsx
│  │     │  ├─ style.ts
│  │     │  └─ svg
│  │     │     ├─ download.svg
│  │     │     ├─ information.svg
│  │     │     ├─ more.svg
│  │     │     └─ refrash.svg
│  │     ├─ styles
│  │     │  └─ style.ts
│  │     ├─ topButtons
│  │     │  ├─ historyButton.tsx
│  │     │  ├─ index.tsx
│  │     │  ├─ opacityBar.tsx
│  │     │  ├─ style.ts
│  │     │  ├─ svg
│  │     │  │  ├─ next.svg
│  │     │  │  ├─ prev.svg
│  │     │  │  └─ rotato.svg
│  │     │  └─ zoomButton.tsx
│  │     └─ types.ts
│  ├─ index.ts
│  └─ store
│     ├─ common
│     │  ├─ categorySlice.ts
│     │  ├─ drawSlice.ts
│     │  ├─ nodeSlice.ts
│     │  ├─ photoEditorSlice.ts
│     │  └─ zoomSlice.ts
│     ├─ rootReducer.ts
│     └─ store.ts
├─ tsconfig.json
└─ types
   └─ react-c
      └─ index.d.ts

```
