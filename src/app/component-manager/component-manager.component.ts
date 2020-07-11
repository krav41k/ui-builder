import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {Subscription} from 'rxjs';
import {ComponentItem} from '../components-layout/components-layout.component';
import {ExtendedModelClass, SimpleModelClass} from '../object-models/model.classes';

interface PropertyItem {
  name: string;
  type: string;
  availableValues?: string[];
  actualValue: string;
  floatValue: string;
  previousValue: string;
}

@Component({
  selector: 'app-component-manager',
  templateUrl: './component-manager.component.html',
  styleUrls: ['./component-manager.component.scss']
})
export class ComponentManagerComponent implements OnInit, OnDestroy {

  // sc - selected component
  public visibility = true;
  public selectedComponent;
  public scId;
  public scName;
  public scType; // true - simple, false - extended
  sub: Subscription;

  public input = 'input';

  layoutPropertiesList: Map<string, PropertyItem> = null;
  componentPropertiesList: Map<string, PropertyItem> = null;
  // allComponentPropertiesList: Map<string, PropertyItem> = null;

  constructor(
    componentsSS: ComponentsStorageService,
  ) {
    this.sub = componentsSS.selectedComponentsSteam$.subscribe((component) => {
      if (this.selectedComponent === component) {
        return false;
      }

      this.selectedComponent = component;
      console.log(component);
      this.selectedComponent = component;
      this.scId = component.id;
      this.scName = component.name;
      this.scType = !(component instanceof ExtendedModelClass);
      this.createList();
      this.styleParser(this.selectedComponent.style, this.layoutPropertiesList);
      if (this.scType) {
        this.styleParser(this.selectedComponent.childrenStyle, this.componentPropertiesList);
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  createList() {
    if (this.scType) {
      this.componentPropertiesList = new Map<string, PropertyItem>([
        ['backgroundcolor', {name: 'backgroundColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
        ['color',
          {name: 'color', type: 'select', availableValues: ['primary', 'accent', 'warn'],
            actualValue: null, floatValue: 'primary', previousValue: null
          }
        ],
      ]);
    }

    this.layoutPropertiesList = new Map<string, PropertyItem>([
      ['layoutWidth', null],
      ['layoutHeight', null],
      ['flex', null],
    ]);

  //   this.allComponentPropertiesList = new Map<string, PropertyItem>([
  //   ['alignContent', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['alignItems', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['alignSelf', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['alignmentBaseline', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['all', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['animation', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['animationDelay', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['animationDirection', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['animationDuration', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['animationFillMode', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['animationIterationCou""', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['animationName', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['animationPlayState', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['animationTimingFuncti""', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backdropFilter', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backfaceVisibility', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['background', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundAttachment', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundBlendMode', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundClip', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundImage', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundOrigin', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundPosition', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundPositionX', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundPositionY', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundRepeat', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundRepeatX', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundRepeatY', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['backgroundSize', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['baselineShift', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['blockSize', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['border', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBlockEnd', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBlockEndColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBlockEndStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBlockEndWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBlockStart', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBlockStartColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBlockStartStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBlockStartWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBottom', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBottomColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBottomLeftRadiu', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBottomRightRadi""', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBottomStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderBottomWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderCollapse', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderImage', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderImageOutset', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderImageRepeat', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderImageSlice', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderImageSource', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderImageWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderInlineEnd', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderInlineEndColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderInlineEndStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderInlineEndWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderInlineStart', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderInlineStartColo', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderInlineStartStyl', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderInlineStartWidt', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderLeft', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderLeftColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderLeftStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderLeftWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderRadius', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderRight', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderRightColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderRightStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderRightWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderSpacing', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderTop', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderTopColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderTopLeftRadius', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderTopRightRadius', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderTopStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderTopWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['borderWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['bottom', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['boxShadow', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['boxSizing', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['breakAfter', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['breakBefore', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['breakInside', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['bufferedRendering', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['captionSide', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['caretColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['clear', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['clip', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['clipPath', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['clipRule', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['color', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['colorInterpolation', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['colorInterpolationFil: ""', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['colorRendering', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['colorScheme', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['columnCount', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['columnFill', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['columnGap', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['columnRule', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['columnRuleColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['columnRuleStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['columnRuleWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['columnSpan', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['columnWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['columns', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['contain', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['containIntrinsicSize', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['content', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['counterIncrement', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['counterReset', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['cssFloat', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['cssText', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['cursor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['cx', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['cy', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['d', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['direction', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['display', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['dominantBaseline', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['emptyCells', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fill', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fillOpacity', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fillRule', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['filter', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['flex', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['flexBasis', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['flexDirection', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['flexFlow', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['flexGrow', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['flexShrink', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['flexWrap', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['float', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['floodColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['floodOpacity', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['font', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontDisplay', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontFamily', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontFeatureSettings', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontKerning', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontOpticalSizing', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontSize', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontStretch', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontVariant', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontVariantCaps', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontVariantEastAsian', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontVariantLigatures', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontVariantNumeric', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontVariationSettings', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['fontWeight', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gap', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['grid', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridArea', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridAutoColumns', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridAutoFlow', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridAutoRows', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridColumn', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridColumnEnd', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridColumnGap', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridColumnStart', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridGap', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridRow', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridRowEnd', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridRowGap', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridRowStart', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridTemplate', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridTemplateAreas', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridTemplateColumns', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['gridTemplateRows', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['height', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['hyphens', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['imageOrientation', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['imageRendering', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['inlineSize', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['isolation', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['justifyContent', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['justifyItems', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['justifySelf', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['left', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['length', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['letterSpacing', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['lightingColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['lineBreak', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['lineHeight', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['listStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['listStyleImage', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['listStylePosition', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['listStyleType', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['margin', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['marginBlockEnd', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['marginBlockStart', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['marginBottom', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['marginInlineEnd', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['marginInlineStart', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['marginLeft', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['marginRight', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['marginTop', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['marker', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['markerEnd', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['markerMid', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['markerStart', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['mask', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['maskType', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['maxBlockSize', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['maxHeight', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['maxInlineSize', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['maxWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['maxZoom', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['minBlockSize', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['minHeight', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['minInlineSize', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['minWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['minZoom', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['mixBlendMode', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['objectFit', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['objectPosition', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['offset', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['offsetDistance', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['offsetPath', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['offsetRotate', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['opacity', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['order', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['orientation', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['orphans', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['outline', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['outlineColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['outlineOffset', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['outlineStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['outlineWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['overflow', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['overflowAnchor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['overflowWrap', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['overflowX', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['overflowY', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['overscrollBehavior', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['overscrollBehaviorBlo""', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['overscrollBehaviorInl ""', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['overscrollBehaviorX', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['overscrollBehaviorY', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['padding', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['paddingBlockEnd', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['paddingBlockStart', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['paddingBottom', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['paddingInlineEnd', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['paddingInlineStart', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['paddingLeft', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['paddingRight', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['paddingTop', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['pageBreakAfter', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['pageBreakBefore', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['pageBreakInside', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['paintOrder', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['parentRule: ', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['perspective', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['perspectiveOrigin', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['placeContent', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['placeItems', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['placeSelf', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['pointerEvents', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['position', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['quotes', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['r', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['resize', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['right', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['rowGap', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['rx', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['ry', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollBehavior', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollMargin', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollMarginBlock', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollMarginBlockEnd', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollMarginBlockStar', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollMarginBottom', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollMarginInline', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollMarginInlineEnd', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollMarginInlineSta""', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollMarginLeft', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollMarginRight', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollMarginTop', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollPadding', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollPaddingBlock', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollPaddingBlockEnd', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollPaddingBlockSta""', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollPaddingBottom', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollPaddingInline', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollPaddingInlineEn', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollPaddingInlineSt ""', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollPaddingLeft', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollPaddingRight', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollPaddingTop', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollSnapAlign', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollSnapStop', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['scrollSnapType', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['shapeImageThreshold', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['shapeMargin', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['shapeOutside', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['shapeRendering', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['size', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['speak', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['src', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['stopColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['stopOpacity', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['stroke', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['strokeDasharray', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['strokeDashoffset', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['strokeLinecap', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['strokeLinejoin', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['strokeMiterlimit', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['strokeOpacity', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['strokeWidth', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['tabSize', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['tableLayout', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textAlign', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textAlignLast', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textAnchor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textCombineUpright', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textDecoration', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textDecorationColor', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textDecorationLine', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textDecorationSkipInk', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textDecorationStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textIndent', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textOrientation', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textOverflow', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textRendering', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textShadow', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textSizeAdjust', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textTransform', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['textUnderlinePosition', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['top', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['touchAction', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['transform', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['transformBox', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['transformOrigin', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['transformStyle', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['transition', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['transitionDelay', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['transitionDuration', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['transitionProperty', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['transitionTimingFunct', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['unicodeBidi', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['unicodeRange', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['userSelect', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['userZoom', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['vectorEffect', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['verticalAlign', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ['visibility', {name: null, type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  //   ]);
  }

  styleParser(text, list: Map<string, PropertyItem>) {
    if (text !== '') {
      const clearText = text.replace(/-/g, '').slice(0, -1);
      console.log(clearText);
      const properties = clearText.split('; ');
      console.log(properties);
      properties.forEach(property => {
        const parsedProperty = property.split(': ');
        console.log(parsedProperty);
        const propertyItem = list.get(parsedProperty[0]);
        if (propertyItem !== undefined) {
          propertyItem.actualValue = parsedProperty[1];
          propertyItem.floatValue = parsedProperty[1];
          propertyItem.previousValue = parsedProperty[1];
        }
      });
    }
  }
}
