import { fabric, _calcTextareaPosition } from "fabric-with-erasing";
import { useRef } from "react";

export default function TextboxTest() {
  // const textareaRef=useRef<HTMLTextAreaElement>(null);
  // const hiddenTextarea = textareaRef.current;

  //     var style = _calcTextareaPosition();
  //     if (hiddenTextareaContainer)  hiddenTextareaContainer.appendChild(hiddenTextarea);

  //     else {
  //       fabric.document.body.appendChild(hiddenTextarea);
  //     }

  //     fabric.util.addListener(hiddenTextarea, 'keydown', onKeyDown.bind(this));
  //     fabric.util.addListener(hiddenTextarea, 'keyup', onKeyUp.bind(this));
  //     fabric.util.addListener(hiddenTextarea, 'input', onInput.bind(this));
  //     fabric.util.addListener(hiddenTextarea, 'copy', copy.bind(this));
  //     fabric.util.addListener(hiddenTextarea, 'cut', copy.bind(this));
  //     fabric.util.addListener(hiddenTextarea, 'paste', paste.bind(this));
  //     fabric.util.addListener(hiddenTextarea, 'compositionstart', onCompositionStart.bind(this));
  //     fabric.util.addListener(hiddenTextarea, 'compositionupdate', onCompositionUpdate.bind(this));
  //     fabric.util.addListener(hiddenTextarea, 'compositionend', onCompositionEnd.bind(this));

  //     if (!_clickHandlerInitialized && canvas) {
  //       fabric.util.addListener(canvas.upperCanvasEl, 'click', onClick.bind(this));
  //       _clickHandlerInitialized = true;
  //     }
  //   }

  return (
    <textarea
    //     autocapitalize="off"
    //    autocorrect="off"
    //    autocomplete="off"
    //    spellcheck="false"
    //    data-fabric-hiddentextarea=""
    //     wrap="off"
    ></textarea>
  );
}
