import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {
  PdfViewerComponent,
  LinkAnnotationService,
  BookmarkViewService,
  MagnificationService,
  ThumbnailViewService,
  ToolbarService,
  NavigationService,
  TextSearchService,
  TextSelectionService,
  PrintService,
  AnnotationService,
  FormFieldsService,
  FormDesignerService,
  AnnotationPropertiesChangeEventArgs,
  AnnotationAddEventArgs,
} from '@syncfusion/ej2-angular-pdfviewer';
import { getUniqueID } from '@syncfusion/ej2-base';
import { FreeTextSelecte } from './app/FreeTextSelecte';
import { FreeTextType } from './app/FreeTextType';

/**
 * Default PdfViewer Controller
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:max-line-length
  providers: [
    LinkAnnotationService,
    BookmarkViewService,
    MagnificationService,
    ThumbnailViewService,
    ToolbarService,
    NavigationService,
    TextSearchService,
    TextSelectionService,
    PrintService,
    AnnotationService,
    FormFieldsService,
    FormDesignerService,
  ],
})
export class AppComponent {
  public service: string =
    'https://services.syncfusion.com/angular/production/api/pdfviewer';
  public document: string = 'PDF_Succinctly.pdf';
  ngOnInit(): void {
    // ngOnInit function
  }

  public annotationAdd() {
    var pdfviewer = (<any>document.getElementById('pdfViewer'))
      .ej2_instances[0];

    pdfviewer.freeTextSettings.width = 100;
    pdfviewer.freeTextSettings.height = 25;
    pdfviewer.freeTextSettings.textAlignment = 'Left';
    pdfviewer.freeTextSettings.borderStyle = 'solid';
    pdfviewer.freeTextSettings.borderWidth = 2;
    pdfviewer.freeTextSettings.fontFamily = 'Helvetica';
    pdfviewer.freeTextSettings.fontSize = 14;
    pdfviewer.freeTextSettings.fontColor = 'black';
    pdfviewer.freeTextSettings.defaultText = 'Type here';
    pdfviewer.freeTextSettings.isLock = false;
    pdfviewer.freeTextSettings.isReadonly = false;
    pdfviewer.freeTextSettings.minHeight = 25;
    pdfviewer.freeTextSettings.minWidth = 100;
    pdfviewer.freeTextSettings.enableAutoFit = false;

    let customType: FreeTextType = new FreeTextType();
    customType.Type = 'Text';
    customType.RequestId = '123454';
    customType.HintText = '';
    customType.IsReadOnly = false;
    customType.IsRequired = false;
    pdfviewer.freeTextSettings.customData = customType;
    pdfviewer.annotationModule.setAnnotationMode('FreeText');
  }

  public annotationPropertiesChange(
    event: AnnotationPropertiesChangeEventArgs
  ) {
    console.log('annotationPropertiesChange', event);
    var pdfviewer = (<any>document.getElementById('pdfViewer'))
      .ej2_instances[0];
    var annotationCollections = pdfviewer.annotationCollection;
    if (annotationCollections.length != 0) {
      var selectedAnnotation = annotationCollections.find(
        (x: { annotationId: string }) => x.annotationId == event.annotationId
      );
      if (selectedAnnotation != undefined) {
        if (event.isFreeTextChanged) {
          if (
            selectedAnnotation.customData &&
            selectedAnnotation.customData.Type == 'Text'
          ) {
            let freeTextSelected: FreeTextSelecte = new FreeTextSelecte();

            if (
              selectedAnnotation.customData.IsReadOnly &&
              event.currentText == ''
            ) {
              freeTextSelected.Type = selectedAnnotation.customData.Type;
              freeTextSelected.Guid = getUniqueID.toString();
              freeTextSelected.AnnotationId = event.annotationId;
              freeTextSelected.FontColor = selectedAnnotation.fontColor;
              freeTextSelected.FontFamily = selectedAnnotation.fontFamily;
              freeTextSelected.FontSize = selectedAnnotation.fontSize;
              freeTextSelected.DefaultText =
                event.currentText == '' ? 'Type here' : event.currentText;
              freeTextSelected.IsBold = selectedAnnotation.font.isBold;
              freeTextSelected.IsItalic = selectedAnnotation.font.isItalic;
              freeTextSelected.IsUnderLine =
                selectedAnnotation.font.isUnderline;
              freeTextSelected.HintText =
                selectedAnnotation.customData.HintText;
              freeTextSelected.IsReadOnly =
                selectedAnnotation.customData.IsReadOnly;
              freeTextSelected.IsRequired =
                selectedAnnotation.customData.IsRequired;

              pdfviewer.annotation.editAnnotation(selectedAnnotation);
            } else {
              freeTextSelected.Type = selectedAnnotation.customData.Type;
              freeTextSelected.Guid = getUniqueID.toString();
              freeTextSelected.AnnotationId = event.annotationId;
              freeTextSelected.FontColor = selectedAnnotation.fontColor;
              freeTextSelected.FontFamily = selectedAnnotation.fontFamily;
              freeTextSelected.FontSize = selectedAnnotation.fontSize;
              freeTextSelected.DefaultText =
                event.currentText == '' ? 'Type here' : event.currentText;
              freeTextSelected.IsBold = selectedAnnotation.font.isBold;
              freeTextSelected.IsItalic = selectedAnnotation.font.isItalic;
              freeTextSelected.IsUnderLine =
                selectedAnnotation.font.isUnderline;
              freeTextSelected.HintText =
                selectedAnnotation.customData.HintText;
              freeTextSelected.IsReadOnly =
                selectedAnnotation.customData.IsReadOnly;
              freeTextSelected.IsRequired =
                selectedAnnotation.customData.IsRequired;

              console.log('Annotation Edit 6');
              pdfviewer.annotation.editAnnotation(selectedAnnotation);
            }
          }
        }
      }
    }
  }

  public annotationAdded(e: AnnotationAddEventArgs): void {
    console.log('annotationAdded', e);
    var pdfviewer = (<any>document.getElementById('pdfViewer'))
      .ej2_instances[0];
    var anno =
      pdfviewer.annotationCollection[pdfviewer.annotationCollection.length - 1];
    anno.annotationSettings.isLock = false;
    anno.customData.RequestId = '123454';
    if (anno.customData && anno.customData.Type == 'Text') {
      anno.annotationSettings.IsReadonly = false;
      anno.isReadonly = false;
      anno.enableAutoFit = false;
    }
    console.log('Annotation Edit 4');
    pdfviewer.annotation.editAnnotation(anno);
  }
}
