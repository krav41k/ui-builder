import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {Observable, Subscription} from 'rxjs';
import {ExtendedModelClass} from '../object-models/model.classes';

export interface PropertyItem {
  name: string;
  inputType: string;
  availableValues?: string[];
  actualValue: string;
  value: string;
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
  public scIsSimple; // true - simple, false - extended
  public content;
  sub: Subscription;

  layoutPropertiesList: Map<string, PropertyItem> = null;
  componentPropertiesList: Map<string, PropertyItem> = null;

  filterEmitter: EventEmitter<any> = new EventEmitter<any>();
  filteredPropertiesObservable: Observable<any> = new Observable<any>(subscriber => {
    this.filterEmitter.subscribe((obj: {value: string, list: Map<string, PropertyItem> | string[]}) => {
      Array.isArray(obj.list)
        ? subscriber.next(this.filter(obj.value, obj.list))
        : subscriber.next(this.filter(obj.value, Array.from(obj.list.values(), item => item.name)));
    });
  });

  allPropertiesList = new Map<string, PropertyItem>([
    ['aligncontent', {name: 'alignContent', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['alignitems', {name: 'alignItems', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['alignself', {name: 'alignSelf', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['alignmentbaseline', {name: 'alignmentBaseline', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['all', {name: 'all', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['animation', {name: 'animation', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['animationdelay', {name: 'animationDelay', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['animationdirection', {name: 'animationDirection', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['animationfillmode', {name: 'animationFillMode', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['animationiterationcount', {name: 'animationIterationCou', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['animationname', {name: 'animationName', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['animationplaystate', {name: 'animationPlayState', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['animationtimingfunction', {name: 'animationTimingFunction', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backdropfilter', {name: 'backdropFilter', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backfacevisibility', {name: 'backfaceVisibility', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['background', {name: 'background', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundattachment', {name: 'backgroundAttachment', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundblendmode', {name: 'backgroundBlendMode', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundclip', {name: 'backgroundClip', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundcolor', {name: 'backgroundColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundimage', {name: 'backgroundImage', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundorigin', {name: 'backgroundOrigin', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundposition', {name: 'backgroundPosition', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundpositionx', {name: 'backgroundPositionX', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundpositiony', {name: 'backgroundPositionY', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundrepeat', {name: 'backgroundRepeat', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundrepeatx', {name: 'backgroundRepeatX', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundrepeaty', {name: 'backgroundRepeatY', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['backgroundsize', {name: 'backgroundSize', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['baselineshift', {name: 'baselineShift', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['blocksize', {name: 'blockSize', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['border', {name: 'border', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderblockend', {name: 'borderBlockEnd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderblockendcolor', {name: 'borderBlockEndColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderblockendstyle', {name: 'borderBlockEndStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderblockendwidth', {name: 'borderBlockEndWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderblockstart', {name: 'borderBlockStart', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderblockstartcolor', {name: 'borderBlockStartColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderblockstartstyle', {name: 'borderBlockStartStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderblockstartwidth', {name: 'borderBlockStartWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderbottom', {name: 'borderBottom', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderbottomcolor', {name: 'borderBottomColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderbottomleftradius', {name: 'borderBottomLeftRadius', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderbottomrightradius', {name: 'borderBottomRightRadius', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderbottomstyle', {name: 'borderBottomStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderbottomwidth', {name: 'borderBottomWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['bordercollapse', {name: 'borderCollapse', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['bordercolor', {name: 'borderColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderimage', {name: 'borderImage', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderimageoutset', {name: 'borderImageOutset', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderimagerepeat', {name: 'borderImageRepeat', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderimageslice', {name: 'borderImageSlice', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderimagesource', {name: 'borderImageSource', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderimagewidth', {name: 'borderImageWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderinlineend', {name: 'borderInlineEnd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderinlineendcolor', {name: 'borderInlineEndColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderinlineendstyle', {name: 'borderInlineEndStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderinlineendwidth', {name: 'borderInlineEndWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderinlinestart', {name: 'borderInlineStart', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderinlinestartcolor', {name: 'borderInlineStartColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderinlinestartstyle', {name: 'borderInlineStartStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderinlinestartwidth', {name: 'borderInlineStartWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderleft', {name: 'borderLeft', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderleftcolor', {name: 'borderLeftColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderleftstyle', {name: 'borderLeftStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderleftwidth', {name: 'borderLeftWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderradius', {name: 'borderRadius', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderright', {name: 'borderRight', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderrightcolor', {name: 'borderRightColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderrightstyle', {name: 'borderRightStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderrightwidth', {name: 'borderRightWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderspacing', {name: 'borderSpacing', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderstyle', {name: 'borderStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['bordertop', {name: 'borderTop', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['bordertopcolor', {name: 'borderTopColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['bordertopleftradius', {name: 'borderTopLeftRadius', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['bordertoprightradius', {name: 'borderTopRightRadius', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['bordertopstyle', {name: 'borderTopStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['bordertopwidth', {name: 'borderTopWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['borderwidth', {name: 'borderWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['bottom', {name: 'bottom', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['boxshadow', {name: 'boxShadow', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['boxsizing', {name: 'boxSizing', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['breakafter', {name: 'breakAfter', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['breakbefore', {name: 'breakBefore', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['breakinside', {name: 'breakInside', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['bufferedrendering', {name: 'bufferedRendering', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['captionside', {name: 'captionSide', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['caretcolor', {name: 'caretColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['clear', {name: 'clear', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['clip', {name: 'clip', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['clippath', {name: 'clipPath', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['cliprule', {name: 'clipRule', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['color', {name: 'color', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['colorsnterpolation', {name: 'colorInterpolation', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['colorsnterpolationfilters', {name: 'colorInterpolationFilters', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['colorrendering', {name: 'colorRendering', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['colorscheme', {name: 'colorScheme', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['columncount', {name: 'columnCount', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['columnfill', {name: 'columnFill', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['columngap', {name: 'columnGap', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['columnrule', {name: 'columnRule', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['columnrulecolor', {name: 'columnRuleColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['columnrulestyle', {name: 'columnRuleStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['columnrulewidth', {name: 'columnRuleWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['columnspan', {name: 'columnSpan', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['columnwidth', {name: 'columnWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['columns', {name: 'columns', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['contain', {name: 'contain', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['containintrinsicsize', {name: 'containIntrinsicSize', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['content', {name: 'content', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['counterincrement', {name: 'counterIncrement', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['counterreset', {name: 'counterReset', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['cssfloat', {name: 'cssFloat', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['csstext', {name: 'cssText', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['cursor', {name: 'cursor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['cx', {name: 'cx', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['cy', {name: 'cy', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['d', {name: 'd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['direction', {name: 'direction', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['display', {
      name: 'display',
      inputType: 'complete',
      availableValues: ['block', 'inline', 'inline-block', 'inline-table', 'list-item', 'none', 'run-in', 'table', 'table-caption',
        'table-cell', 'table-column-group', 'table-column', 'table-footer-group', 'table-header-group', 'table-row', 'table-row-group'],
      actualValue: null, value: null, previousValue: null
    }],
    ['dominantbaseline', {name: 'dominantBaseline', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['emptycells', {name: 'emptyCells', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fill', {name: 'fill', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fillopacity', {name: 'fillOpacity', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fillrule', {name: 'fillRule', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['filter', {name: 'filter', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['flex', {name: 'flex', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['flexbasis', {name: 'flexBasis', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['flexdirection', {name: 'flexDirection', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['flexflow', {name: 'flexFlow', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['flexgrow', {name: 'flexGrow', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['flexshrink', {name: 'flexShrink', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['flexwrap', {name: 'flexWrap', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['float', {name: 'float', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['floodcolor', {name: 'floodColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['floodopacity', {name: 'floodOpacity', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['font', {name: 'font', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontdisplay', {name: 'fontDisplay', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontfamily', {name: 'fontFamily', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontfeaturesettings', {name: 'fontFeatureSettings', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontkerning', {name: 'fontKerning', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontopticalsizing', {name: 'fontOpticalSizing', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontsize', {name: 'fontSize', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontstretch', {name: 'fontStretch', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontstyle', {name: 'fontStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontvariant', {name: 'fontVariant', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontvariantcaps', {name: 'fontVariantCaps', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontvarianteastAsian', {name: 'fontVariantEastAsian', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontvariantligatures', {name: 'fontVariantLigatures', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontvariantnumeric', {name: 'fontVariantNumeric', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontvariationsettings', {name: 'fontVariationSettings', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['fontweight', {name: 'fontWeight', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gap', {name: 'gap', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['grid', {name: 'grid', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridarea', {name: 'gridArea', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridautocolumns', {name: 'gridAutoColumns', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridautoflow', {name: 'gridAutoFlow', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridautorows', {name: 'gridAutoRows', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridcolumn', {name: 'gridColumn', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridcolumnend', {name: 'gridColumnEnd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridcolumngap', {name: 'gridColumnGap', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridcolumnstart', {name: 'gridColumnStart', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridgap', {name: 'gridGap', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridrow', {name: 'gridRow', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridrowend', {name: 'gridRowEnd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridrowgap', {name: 'gridRowGap', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridrowstart', {name: 'gridRowStart', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridtemplate', {name: 'gridTemplate', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridtemplateareas', {name: 'gridTemplateAreas', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridtemplatecolumns', {name: 'gridTemplateColumns', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['gridtemplaterows', {name: 'gridTemplateRows', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['height', {name: 'height', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['hyphens', {name: 'hyphens', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['imageorientation', {name: 'imageOrientation', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['imagerendering', {name: 'imageRendering', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['inlinesize', {name: 'inlineSize', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['isolation', {name: 'isolation', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['justifycontent', {name: 'justifyContent', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['justifyitems', {name: 'justifyItems', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['justifyself', {name: 'justifySelf', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['left', {name: 'left', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['length', {name: 'length', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['letterspacing', {name: 'letterSpacing', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['lightingcolor', {name: 'lightingColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['linebreak', {name: 'lineBreak', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['lineheight', {name: 'lineHeight', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['liststyle', {name: 'listStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['liststyleimage', {name: 'listStyleImage', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['liststyleposition', {name: 'listStylePosition', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['liststyleinputType', {name: 'listStyleinputType', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['margin', {name: 'margin', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['marginblockend', {name: 'marginBlockEnd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['marginblockstart', {name: 'marginBlockStart', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['marginbottom', {name: 'marginBottom', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['margininlineend', {name: 'marginInlineEnd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['margininlinestart', {name: 'marginInlineStart', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['marginleft', {name: 'marginLeft', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['marginright', {name: 'marginRight', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['margintop', {name: 'marginTop', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['marker', {name: 'marker', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['markerend', {name: 'markerEnd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['markermid', {name: 'markerMid', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['markerstart', {name: 'markerStart', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['mask', {name: 'mask', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['maskinputType', {name: 'maskinputType', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['maxblocksize', {name: 'maxBlockSize', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['maxheight', {name: 'maxHeight', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['maxinlinesize', {name: 'maxInlineSize', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['maxwidth', {name: 'maxWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['maxzoom', {name: 'maxZoom', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['minblocksize', {name: 'minBlockSize', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['minheight', {name: 'minHeight', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['mininlinesize', {name: 'minInlineSize', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['minwidth', {name: 'minWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['minzoom', {name: 'minZoom', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['mixblendmode', {name: 'mixBlendMode', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['objectfit', {name: 'objectFit', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['objectposition', {name: 'objectPosition', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['offset', {name: 'offset', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['offsetdistance', {name: 'offsetDistance', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['offsetpath', {name: 'offsetPath', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['offsetrotate', {name: 'offsetRotate', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['opacity', {name: 'opacity', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['order', {name: 'order', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['orientation', {name: 'orientation', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['orphans', {name: 'orphans', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['outline', {name: 'outline', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['outlinecolor', {name: 'outlineColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['outlineoffset', {name: 'outlineOffset', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['outlinestyle', {name: 'outlineStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['outlinewidth', {name: 'outlineWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['overflow', {name: 'overflow', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['overflowanchor', {name: 'overflowAnchor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['overflowwrap', {name: 'overflowWrap', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['overflowx', {name: 'overflowX', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['overflowy', {name: 'overflowY', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['overscrollbehavior', {name: 'overscrollBehavior', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['overscrollbehaviorblock""', {name: 'overscrollBehaviorBlock', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['overscrollbehaviorinline', {name: 'overscrollBehaviorInline', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['overscrollbehaviorx', {name: 'overscrollBehaviorX', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['overscrollbehaviory', {name: 'overscrollBehaviorY', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['padding', {name: 'padding', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['paddingblockend', {name: 'paddingBlockEnd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['paddingblockstart', {name: 'paddingBlockStart', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['paddingbottom', {name: 'paddingBottom', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['paddinginlineend', {name: 'paddingInlineEnd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['paddinginlinestart', {name: 'paddingInlineStart', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['paddingleft', {name: 'paddingLeft', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['paddingright', {name: 'paddingRight', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['paddingtop', {name: 'paddingTop', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['pagebreakafter', {name: 'pageBreakAfter', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['pagebreakbefore', {name: 'pageBreakBefore', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['pagebreakinside', {name: 'pageBreakInside', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['paintorder', {name: 'paintOrder', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['parentrule', {name: 'parentRule', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['perspective', {name: 'perspective', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['perspectiveorigin', {name: 'perspectiveOrigin', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['placecontent', {name: 'placeContent', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['placeitems', {name: 'placeItems', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['placeself', {name: 'placeSelf', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['pointerevents', {name: 'pointerEvents', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['position', {name: 'position', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['quotes', {name: 'quotes', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['r', {name: 'r', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['resize', {name: 'resize', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['right', {name: 'right', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['rowgap', {name: 'rowGap', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['rx', {name: 'rx', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['ry', {name: 'ry', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollbehavior', {name: 'scrollBehavior', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollmargin', {name: 'scrollMargin', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollmarginblock', {name: 'scrollMarginBlock', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollmarginblockend', {name: 'scrollMarginBlockEnd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollmarginblockstar', {name: 'scrollMarginBlockStar', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollmarginbottom', {name: 'scrollMarginBottom', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollmargininline', {name: 'scrollMarginInline', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollmargininlineend', {name: 'scrollMarginInlineEnd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollmargininlinestart', {name: 'scrollMarginInlineStart', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollmarginleft', {name: 'scrollMarginLeft', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollmarginright', {name: 'scrollMarginRight', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollmargintop', {name: 'scrollMarginTop', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollpadding', {name: 'scrollPadding', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollpaddingblock', {name: 'scrollPaddingBlock', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollpaddingblockend', {name: 'scrollPaddingBlockEnd', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollpaddingblockstart', {name: 'scrollPaddingBlockSta', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollpaddingbottom', {name: 'scrollPaddingBottom', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollpaddinginline', {name: 'scrollPaddingInline', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollpaddinginlineend', {name: 'scrollPaddingInlineEn', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollpaddinginlinestart', {name: 'scrollPaddingInlineSt', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollpaddingleft', {name: 'scrollPaddingLeft', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollpaddingright', {name: 'scrollPaddingRight', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollpaddingtop', {name: 'scrollPaddingTop', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollsnapalign', {name: 'scrollSnapAlign', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollsnapstop', {name: 'scrollSnapStop', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['scrollsnapinputType', {name: 'scrollSnapinputType', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['shapeimagethreshold', {name: 'shapeImageThreshold', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['shapemargin', {name: 'shapeMargin', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['shapeoutside', {name: 'shapeOutside', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['shaperendering', {name: 'shapeRendering', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['size', {name: 'size', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['speak', {name: 'speak', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['src', {name: 'src', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['stopcolor', {name: 'stopColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['stopopacity', {name: 'stopOpacity', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['stroke', {name: 'stroke', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['strokedasharray', {name: 'strokeDasharray', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['strokedashoffset', {name: 'strokeDashoffset', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['strokelinecap', {name: 'strokeLinecap', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['strokelinejoin', {name: 'strokeLinejoin', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['strokemiterlimit', {name: 'strokeMiterlimit', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['strokeopacity', {name: 'strokeOpacity', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['strokewidth', {name: 'strokeWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['tabsize', {name: 'tabSize', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['tablelayout', {name: 'tableLayout', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textalign', {name: 'textAlign', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textalignlast', {name: 'textAlignLast', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textanchor', {name: 'textAnchor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textcombineupright', {name: 'textCombineUpright', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textdecoration', {name: 'textDecoration', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textdecorationcolor', {name: 'textDecorationColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textdecorationline', {name: 'textDecorationLine', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textdecorationskipink', {name: 'textDecorationSkipInk', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textdecorationstyle', {name: 'textDecorationStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textindent', {name: 'textIndent', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textorientation', {name: 'textOrientation', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textoverflow', {name: 'textOverflow', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textrendering', {name: 'textRendering', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textshadow', {name: 'textShadow', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textsizeadjust', {name: 'textSizeAdjust', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['texttransform', {name: 'textTransform', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['textunderlineposition', {name: 'textUnderlinePosition', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['top', {name: 'top', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['touchaction', {name: 'touchAction', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['transform', {name: 'transform', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['transformbox', {name: 'transformBox', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['transformorigin', {name: 'transformOrigin', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['transformstyle', {name: 'transformStyle', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['transition', {name: 'transition', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['transitiondelay', {name: 'transitionDelay', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['transitionduration', {name: 'transitionDuration', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['transitionproperty', {name: 'transitionProperty', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['transitiontimingfunction', {name: 'transitionTimingFunction', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['unicodebidi', {name: 'unicodeBidi', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['unicoderange', {name: 'unicodeRange', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['userselect', {name: 'userSelect', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['userzoom', {name: 'userZoom', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['vectoreffect', {name: 'vectorEffect', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['verticalalign', {name: 'verticalAlign', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['visibility', {name: 'visibility', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['whitespace', {name: '', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['widows', {name: 'widows', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['width', {name: 'width', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['willchange', {name: 'willChange', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['wordbreak', {name: 'wordBreak', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['wordspacing', {name: 'wordSpacing', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['wordwrap', {name: 'wordWrap', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['writingmode', {name: 'writingMode', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['x', {name: 'x', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['y', {name: 'y', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['zindex', {name: 'zIndex', inputType: 'string', actualValue: null, value: null, previousValue: null}],
    ['zoom', {name: 'zoom', inputType: 'string', actualValue: null, value: null, previousValue: null}],
  ]);
  allProperties: PropertyItem[];

  constructor(
    public componentsSS: ComponentsStorageService,
  ) {
    this.sub = componentsSS.selectedComponents$.subscribe((component) => {
      if (this.selectedComponent === component) {
        return false;
      }

      this.selectedComponent = component;

      this.scId = component.id;
      this.scName = component.name;
      this.scIsSimple = !(component instanceof ExtendedModelClass);
      this.content = component.flexComponentData?.get('content');
      this.createList();
      this.styleParser(this.selectedComponent.style, this.layoutPropertiesList);
      if (this.scIsSimple) {
        this.styleParser(this.selectedComponent.childStyle, this.componentPropertiesList);
      }
    });
  }

  ngOnInit(): void {
    this.allProperties = Array.from(this.allPropertiesList.values());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  createList() {
    if (this.scIsSimple) {
      this.componentPropertiesList = new Map<string, PropertyItem>([
        ['backgroundcolor', {name: 'backgroundColor', inputType: 'string', actualValue: null, value: null, previousValue: null}],
      ]);
    }

    this.layoutPropertiesList = new Map<string, PropertyItem>([
      ['layoutwidth', {name: 'layoutWidth', inputType: 'string', actualValue: null, value: null, previousValue: null}],
      ['layoutheight', {name: 'layoutHeight', inputType: 'string', actualValue: null, value: null, previousValue: null}],
      ['flex', {name: 'flex', inputType: 'string', actualValue: null, value: null, previousValue: null}],
      ['display', {
        name: 'display',
        inputType: 'complete',
        availableValues: ['block', 'inline', 'inline-block', 'inline-table', 'list-item', 'none', 'run-in', 'table', 'table-caption',
          'table-cell', 'table-column-group', 'table-column', 'table-footer-group', 'table-header-group', 'table-row', 'table-row-group'],
        actualValue: null, value: null, previousValue: null
      }],
    ]);
  }

  styleParser(text, list: Map<string, PropertyItem>) {
    if (text !== '') {
      const clearText = text.replace(/-/g, '').slice(0, -1);
      const properties = clearText.split('; ');
      properties.forEach(property => {
        const parsedProperty = property.split(': ');
        let propertyItem = list.get(parsedProperty[0]);
        if (propertyItem !== undefined) {
          propertyItem.actualValue = parsedProperty[1];
          propertyItem.value = parsedProperty[1];
          propertyItem.previousValue = parsedProperty[1];
        } else {
          propertyItem = this.allPropertiesList.get(parsedProperty[0]);
          if (propertyItem !== undefined) {
            list.set(parsedProperty[0], propertyItem);
            propertyItem.actualValue = parsedProperty[1];
            propertyItem.value = parsedProperty[1];
            propertyItem.previousValue = parsedProperty[1];
          } else {
            console.error(propertyItem);
          }
        }
      });
    }
  }

  applyInput(obj: PropertyItem, inputType) {
    this.applyStyle(obj, inputType);
    obj.previousValue = obj.actualValue;
    obj.actualValue = obj.value;
  }

  applyStyle(obj, inputType) {
    if (inputType === 'main') {
      this.selectedComponent.componentRef.instance.el.nativeElement.style[obj.name] = obj.value;
      this.selectedComponent.style = this.selectedComponent.componentRef.instance.el.nativeElement.style.cssText;
    } else {
      this.selectedComponent.componentRef.instance.childEl.nativeElement.style[obj.name] = obj.value;
      this.selectedComponent.childStyle = this.selectedComponent.componentRef.instance.childEl.nativeElement.style.cssText;
    }
  }

  cancelInput(obj: PropertyItem) {
    obj.value = obj.actualValue;
  }

  filter(value: string, list: string[]): any {
    const filterValue = value.toLowerCase();
    return list.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

  onFocus(event: FocusEvent, list: Map<string, PropertyItem>) {
    this.filterEmitter.emit({value: (event.target as HTMLInputElement).value, list});
  }

  onInput(event: InputEvent, list: Map<string, PropertyItem>) {
    this.filterEmitter.emit({value: (event.target as HTMLInputElement).value, list});
  }

  processProperty(obj1, obj2, obj3) {

    let list;
    if (obj1 === 'main') {
      list = this.layoutPropertiesList;
    } else {
      list = this.componentPropertiesList;
    }

    let item = list.get(obj2.toLowerCase());
    if (item !== undefined) {
      item.value = obj3;
      this.applyInput(item, obj1);
    } else {
      item = this.allPropertiesList.get(obj2.toLowerCase());
      item.actualValue = obj3;
      item.value = obj3;
      item.previousValue = obj3;
      list.set(obj2.toLowerCase(), item);
      this.applyStyle(item, obj1);
    }
  }

  addContent() {
    const content = this.selectedComponent.flexComponentData.get('content');
    const newEntity = {};
    content.requiredFields.forEach(item => {
      newEntity[item.name] = item.value;
    });
    content.value.push(newEntity);
  }

  getKeys(obj) {
    return Object.keys(obj);
  }
}
