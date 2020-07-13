import {Component, ElementRef, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {ComponentsStorageService} from '../shared/services/components-storage.service';
import {Observable, Subscription} from 'rxjs';
import {ExtendedModelClass} from '../object-models/model.classes';

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

  filterEmitter: EventEmitter<any> = new EventEmitter<any>();
  filteredPropertiesObservable: Observable<any> = new Observable<any>(subscriber => {
    this.filterEmitter.subscribe((obj) => {
      subscriber.next(this.filter(obj.value, obj.list));
    });
  });
  allPropertiesList = new Map<string, PropertyItem>([
    ['aligncontent', {name: 'alignContent', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['alignitems', {name: 'alignItems', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['alignself', {name: 'alignSelf', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['alignmentbaseline', {name: 'alignmentBaseline', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['all', {name: 'all', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['animation', {name: 'animation', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['animationdelay', {name: 'animationDelay', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['animationdirection', {name: 'animationDirection', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['animationfillmode', {name: 'animationFillMode', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['animationiterationcount', {name: 'animationIterationCou', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['animationname', {name: 'animationName', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['animationplaystate', {name: 'animationPlayState', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['animationtimingfunction', {name: 'animationTimingFunction', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backdropfilter', {name: 'backdropFilter', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backfacevisibility', {name: 'backfaceVisibility', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['background', {name: 'background', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundattachment', {name: 'backgroundAttachment', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundblendmode', {name: 'backgroundBlendMode', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundclip', {name: 'backgroundClip', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundcolor', {name: 'backgroundColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundimage', {name: 'backgroundImage', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundorigin', {name: 'backgroundOrigin', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundposition', {name: 'backgroundPosition', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundpositionx', {name: 'backgroundPositionX', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundpositiony', {name: 'backgroundPositionY', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundrepeat', {name: 'backgroundRepeat', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundrepeatx', {name: 'backgroundRepeatX', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundrepeaty', {name: 'backgroundRepeatY', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['backgroundsize', {name: 'backgroundSize', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['baselineshift', {name: 'baselineShift', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['blocksize', {name: 'blockSize', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['border', {name: 'border', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderblockend', {name: 'borderBlockEnd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderblockendcolor', {name: 'borderBlockEndColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderblockendstyle', {name: 'borderBlockEndStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderblockendwidth', {name: 'borderBlockEndWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderblockstart', {name: 'borderBlockStart', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderblockstartcolor', {name: 'borderBlockStartColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderblockstartstyle', {name: 'borderBlockStartStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderblockstartwidth', {name: 'borderBlockStartWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderbottom', {name: 'borderBottom', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderbottomcolor', {name: 'borderBottomColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderbottomleftradius', {name: 'borderBottomLeftRadius', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderbottomrightradius', {name: 'borderBottomRightRadius', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderbottomstyle', {name: 'borderBottomStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderbottomwidth', {name: 'borderBottomWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['bordercollapse', {name: 'borderCollapse', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['bordercolor', {name: 'borderColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderimage', {name: 'borderImage', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderimageoutset', {name: 'borderImageOutset', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderimagerepeat', {name: 'borderImageRepeat', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderimageslice', {name: 'borderImageSlice', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderimagesource', {name: 'borderImageSource', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderimagewidth', {name: 'borderImageWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderinlineend', {name: 'borderInlineEnd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderinlineendcolor', {name: 'borderInlineEndColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderinlineendstyle', {name: 'borderInlineEndStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderinlineendwidth', {name: 'borderInlineEndWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderinlinestart', {name: 'borderInlineStart', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderinlinestartcolor', {name: 'borderInlineStartColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderinlinestartstyle', {name: 'borderInlineStartStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderinlinestartwidth', {name: 'borderInlineStartWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderleft', {name: 'borderLeft', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderleftcolor', {name: 'borderLeftColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderleftstyle', {name: 'borderLeftStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderleftwidth', {name: 'borderLeftWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderradius', {name: 'borderRadius', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderright', {name: 'borderRight', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderrightcolor', {name: 'borderRightColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderrightstyle', {name: 'borderRightStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderrightwidth', {name: 'borderRightWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderspacing', {name: 'borderSpacing', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderstyle', {name: 'borderStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['bordertop', {name: 'borderTop', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['bordertopcolor', {name: 'borderTopColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['bordertopleftradius', {name: 'borderTopLeftRadius', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['bordertoprightradius', {name: 'borderTopRightRadius', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['bordertopstyle', {name: 'borderTopStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['bordertopwidth', {name: 'borderTopWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['borderwidth', {name: 'borderWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['bottom', {name: 'bottom', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['boxshadow', {name: 'boxShadow', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['boxsizing', {name: 'boxSizing', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['breakafter', {name: 'breakAfter', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['breakbefore', {name: 'breakBefore', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['breakinside', {name: 'breakInside', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['bufferedrendering', {name: 'bufferedRendering', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['captionside', {name: 'captionSide', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['caretcolor', {name: 'caretColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['clear', {name: 'clear', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['clip', {name: 'clip', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['clippath', {name: 'clipPath', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['cliprule', {name: 'clipRule', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['color', {name: 'color', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['colorsnterpolation', {name: 'colorInterpolation', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['colorsnterpolationfilters', {name: 'colorInterpolationFilters', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['colorrendering', {name: 'colorRendering', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['colorscheme', {name: 'colorScheme', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['columncount', {name: 'columnCount', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['columnfill', {name: 'columnFill', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['columngap', {name: 'columnGap', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['columnrule', {name: 'columnRule', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['columnrulecolor', {name: 'columnRuleColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['columnrulestyle', {name: 'columnRuleStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['columnrulewidth', {name: 'columnRuleWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['columnspan', {name: 'columnSpan', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['columnwidth', {name: 'columnWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['columns', {name: 'columns', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['contain', {name: 'contain', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['containintrinsicsize', {name: 'containIntrinsicSize', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['content', {name: 'content', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['counterincrement', {name: 'counterIncrement', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['counterreset', {name: 'counterReset', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['cssfloat', {name: 'cssFloat', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['csstext', {name: 'cssText', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['cursor', {name: 'cursor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['cx', {name: 'cx', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['cy', {name: 'cy', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['d', {name: 'd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['direction', {name: 'direction', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['display', {
      name: 'display',
      type: 'autocomplete',
      availableValues: ['block', 'inline', 'inline-block', 'inline-table', 'list-item', 'none', 'run-in', 'table', 'table-caption',
        'table-cell', 'table-column-group', 'table-column', 'table-footer-group', 'table-header-group', 'table-row', 'table-row-group'],
      actualValue: null, floatValue: null, previousValue: null
    }],
    ['dominantbaseline', {name: 'dominantBaseline', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['emptycells', {name: 'emptyCells', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fill', {name: 'fill', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fillopacity', {name: 'fillOpacity', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fillrule', {name: 'fillRule', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['filter', {name: 'filter', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['flex', {name: 'flex', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['flexbasis', {name: 'flexBasis', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['flexdirection', {name: 'flexDirection', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['flexflow', {name: 'flexFlow', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['flexgrow', {name: 'flexGrow', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['flexshrink', {name: 'flexShrink', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['flexwrap', {name: 'flexWrap', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['float', {name: 'float', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['floodcolor', {name: 'floodColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['floodopacity', {name: 'floodOpacity', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['font', {name: 'font', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontdisplay', {name: 'fontDisplay', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontfamily', {name: 'fontFamily', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontfeaturesettings', {name: 'fontFeatureSettings', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontkerning', {name: 'fontKerning', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontopticalsizing', {name: 'fontOpticalSizing', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontsize', {name: 'fontSize', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontstretch', {name: 'fontStretch', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontstyle', {name: 'fontStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontvariant', {name: 'fontVariant', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontvariantcaps', {name: 'fontVariantCaps', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontvarianteastAsian', {name: 'fontVariantEastAsian', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontvariantligatures', {name: 'fontVariantLigatures', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontvariantnumeric', {name: 'fontVariantNumeric', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontvariationsettings', {name: 'fontVariationSettings', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['fontweight', {name: 'fontWeight', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gap', {name: 'gap', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['grid', {name: 'grid', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridarea', {name: 'gridArea', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridautocolumns', {name: 'gridAutoColumns', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridautoflow', {name: 'gridAutoFlow', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridautorows', {name: 'gridAutoRows', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridcolumn', {name: 'gridColumn', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridcolumnend', {name: 'gridColumnEnd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridcolumngap', {name: 'gridColumnGap', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridcolumnstart', {name: 'gridColumnStart', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridgap', {name: 'gridGap', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridrow', {name: 'gridRow', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridrowend', {name: 'gridRowEnd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridrowgap', {name: 'gridRowGap', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridrowstart', {name: 'gridRowStart', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridtemplate', {name: 'gridTemplate', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridtemplateareas', {name: 'gridTemplateAreas', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridtemplatecolumns', {name: 'gridTemplateColumns', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['gridtemplaterows', {name: 'gridTemplateRows', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['height', {name: 'height', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['hyphens', {name: 'hyphens', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['imageorientation', {name: 'imageOrientation', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['imagerendering', {name: 'imageRendering', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['inlinesize', {name: 'inlineSize', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['isolation', {name: 'isolation', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['justifycontent', {name: 'justifyContent', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['justifyitems', {name: 'justifyItems', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['justifyself', {name: 'justifySelf', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['left', {name: 'left', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['length', {name: 'length', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['letterspacing', {name: 'letterSpacing', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['lightingcolor', {name: 'lightingColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['linebreak', {name: 'lineBreak', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['lineheight', {name: 'lineHeight', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['liststyle', {name: 'listStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['liststyleimage', {name: 'listStyleImage', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['liststyleposition', {name: 'listStylePosition', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['liststyleType', {name: 'listStyleType', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['margin', {name: 'margin', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['marginblockend', {name: 'marginBlockEnd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['marginblockstart', {name: 'marginBlockStart', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['marginbottom', {name: 'marginBottom', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['margininlineend', {name: 'marginInlineEnd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['margininlinestart', {name: 'marginInlineStart', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['marginleft', {name: 'marginLeft', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['marginright', {name: 'marginRight', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['margintop', {name: 'marginTop', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['marker', {name: 'marker', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['markerend', {name: 'markerEnd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['markermid', {name: 'markerMid', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['markerstart', {name: 'markerStart', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['mask', {name: 'mask', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['masktype', {name: 'maskType', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['maxblocksize', {name: 'maxBlockSize', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['maxheight', {name: 'maxHeight', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['maxinlinesize', {name: 'maxInlineSize', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['maxwidth', {name: 'maxWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['maxzoom', {name: 'maxZoom', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['minblocksize', {name: 'minBlockSize', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['minheight', {name: 'minHeight', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['mininlinesize', {name: 'minInlineSize', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['minwidth', {name: 'minWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['minzoom', {name: 'minZoom', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['mixblendmode', {name: 'mixBlendMode', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['objectfit', {name: 'objectFit', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['objectposition', {name: 'objectPosition', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['offset', {name: 'offset', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['offsetdistance', {name: 'offsetDistance', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['offsetpath', {name: 'offsetPath', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['offsetrotate', {name: 'offsetRotate', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['opacity', {name: 'opacity', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['order', {name: 'order', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['orientation', {name: 'orientation', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['orphans', {name: 'orphans', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['outline', {name: 'outline', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['outlinecolor', {name: 'outlineColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['outlineoffset', {name: 'outlineOffset', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['outlinestyle', {name: 'outlineStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['outlinewidth', {name: 'outlineWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['overflow', {name: 'overflow', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['overflowanchor', {name: 'overflowAnchor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['overflowwrap', {name: 'overflowWrap', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['overflowx', {name: 'overflowX', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['overflowy', {name: 'overflowY', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['overscrollbehavior', {name: 'overscrollBehavior', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['overscrollbehaviorblock""', {name: 'overscrollBehaviorBlock', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['overscrollbehaviorinline', {name: 'overscrollBehaviorInline', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['overscrollbehaviorx', {name: 'overscrollBehaviorX', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['overscrollbehaviory', {name: 'overscrollBehaviorY', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['padding', {name: 'padding', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['paddingblockend', {name: 'paddingBlockEnd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['paddingblockstart', {name: 'paddingBlockStart', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['paddingbottom', {name: 'paddingBottom', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['paddinginlineend', {name: 'paddingInlineEnd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['paddinginlinestart', {name: 'paddingInlineStart', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['paddingleft', {name: 'paddingLeft', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['paddingright', {name: 'paddingRight', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['paddingtop', {name: 'paddingTop', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['pagebreakafter', {name: 'pageBreakAfter', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['pagebreakbefore', {name: 'pageBreakBefore', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['pagebreakinside', {name: 'pageBreakInside', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['paintorder', {name: 'paintOrder', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['parentrule', {name: 'parentRule', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['perspective', {name: 'perspective', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['perspectiveorigin', {name: 'perspectiveOrigin', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['placecontent', {name: 'placeContent', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['placeitems', {name: 'placeItems', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['placeself', {name: 'placeSelf', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['pointerevents', {name: 'pointerEvents', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['position', {name: 'position', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['quotes', {name: 'quotes', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['r', {name: 'r', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['resize', {name: 'resize', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['right', {name: 'right', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['rowgap', {name: 'rowGap', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['rx', {name: 'rx', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['ry', {name: 'ry', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollbehavior', {name: 'scrollBehavior', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollmargin', {name: 'scrollMargin', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollmarginblock', {name: 'scrollMarginBlock', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollmarginblockend', {name: 'scrollMarginBlockEnd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollmarginblockstar', {name: 'scrollMarginBlockStar', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollmarginbottom', {name: 'scrollMarginBottom', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollmargininline', {name: 'scrollMarginInline', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollmargininlineend', {name: 'scrollMarginInlineEnd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollmargininlinestart', {name: 'scrollMarginInlineStart', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollmarginleft', {name: 'scrollMarginLeft', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollmarginright', {name: 'scrollMarginRight', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollmargintop', {name: 'scrollMarginTop', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollpadding', {name: 'scrollPadding', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollpaddingblock', {name: 'scrollPaddingBlock', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollpaddingblockend', {name: 'scrollPaddingBlockEnd', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollpaddingblockstart', {name: 'scrollPaddingBlockSta', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollpaddingbottom', {name: 'scrollPaddingBottom', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollpaddinginline', {name: 'scrollPaddingInline', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollpaddinginlineend', {name: 'scrollPaddingInlineEn', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollpaddinginlinestart', {name: 'scrollPaddingInlineSt', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollpaddingleft', {name: 'scrollPaddingLeft', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollpaddingright', {name: 'scrollPaddingRight', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollpaddingtop', {name: 'scrollPaddingTop', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollsnapalign', {name: 'scrollSnapAlign', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollsnapstop', {name: 'scrollSnapStop', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['scrollsnaptype', {name: 'scrollSnapType', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['shapeimagethreshold', {name: 'shapeImageThreshold', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['shapemargin', {name: 'shapeMargin', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['shapeoutside', {name: 'shapeOutside', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['shaperendering', {name: 'shapeRendering', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['size', {name: 'size', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['speak', {name: 'speak', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['src', {name: 'src', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['stopcolor', {name: 'stopColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['stopopacity', {name: 'stopOpacity', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['stroke', {name: 'stroke', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['strokedasharray', {name: 'strokeDasharray', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['strokedashoffset', {name: 'strokeDashoffset', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['strokelinecap', {name: 'strokeLinecap', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['strokelinejoin', {name: 'strokeLinejoin', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['strokemiterlimit', {name: 'strokeMiterlimit', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['strokeopacity', {name: 'strokeOpacity', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['strokewidth', {name: 'strokeWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['tabsize', {name: 'tabSize', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['tablelayout', {name: 'tableLayout', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textalign', {name: 'textAlign', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textalignlast', {name: 'textAlignLast', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textanchor', {name: 'textAnchor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textcombineupright', {name: 'textCombineUpright', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textdecoration', {name: 'textDecoration', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textdecorationcolor', {name: 'textDecorationColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textdecorationline', {name: 'textDecorationLine', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textdecorationskipink', {name: 'textDecorationSkipInk', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textdecorationstyle', {name: 'textDecorationStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textindent', {name: 'textIndent', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textorientation', {name: 'textOrientation', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textoverflow', {name: 'textOverflow', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textrendering', {name: 'textRendering', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textshadow', {name: 'textShadow', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textsizeadjust', {name: 'textSizeAdjust', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['texttransform', {name: 'textTransform', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['textunderlineposition', {name: 'textUnderlinePosition', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['top', {name: 'top', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['touchaction', {name: 'touchAction', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['transform', {name: 'transform', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['transformbox', {name: 'transformBox', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['transformorigin', {name: 'transformOrigin', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['transformstyle', {name: 'transformStyle', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['transition', {name: 'transition', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['transitiondelay', {name: 'transitionDelay', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['transitionduration', {name: 'transitionDuration', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['transitionproperty', {name: 'transitionProperty', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['transitiontimingfunction', {name: 'transitionTimingFunction', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['unicodebidi', {name: 'unicodeBidi', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['unicoderange', {name: 'unicodeRange', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['userselect', {name: 'userSelect', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['userzoom', {name: 'userZoom', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['vectoreffect', {name: 'vectorEffect', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['verticalalign', {name: 'verticalAlign', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['visibility', {name: 'visibility', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['whitespace', {name: '', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['widows', {name: 'widows', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['width', {name: 'width', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['willchange', {name: 'willChange', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['wordbreak', {name: 'wordBreak', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['wordspacing', {name: 'wordSpacing', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['wordwrap', {name: 'wordWrap', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['writingmode', {name: 'writingMode', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['x', {name: 'x', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['y', {name: 'y', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['zindex', {name: 'zIndex', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
    ['zoom', {name: 'zoom', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
  ]);
  allProperties: PropertyItem[];

  constructor(
    componentsSS: ComponentsStorageService,
  ) {
    this.sub = componentsSS.selectedComponentsSteam$.subscribe((component) => {
      if (this.selectedComponent === component) {
        return false;
      }

      this.selectedComponent = component;
      this.selectedComponent = component;
      this.scId = component.id;
      this.scName = component.name;
      this.scType = !(component instanceof ExtendedModelClass);
      this.createList();
      this.styleParser(this.selectedComponent.style, this.layoutPropertiesList);
      if (this.scType) {
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
    if (this.scType) {
      this.componentPropertiesList = new Map<string, PropertyItem>([
        ['backgroundcolor', {name: 'backgroundColor', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
      ]);
    }

    this.layoutPropertiesList = new Map<string, PropertyItem>([
      ['layoutwidth', {name: 'layoutWidth', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
      ['layoutheight', {name: 'layoutHeight', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
      ['flex', {name: 'flex', type: 'input', actualValue: null, floatValue: null, previousValue: null}],
      ['display', {
        name: 'display',
        type: 'autocomplete',
        availableValues: ['block', 'inline', 'inline-block', 'inline-table', 'list-item', 'none', 'run-in', 'table', 'table-caption',
          'table-cell', 'table-column-group', 'table-column', 'table-footer-group', 'table-header-group', 'table-row', 'table-row-group'],
        actualValue: null, floatValue: null, previousValue: null
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
          propertyItem.floatValue = parsedProperty[1];
          propertyItem.previousValue = parsedProperty[1];
        } else {
          propertyItem = this.allPropertiesList.get(parsedProperty[0]);
          if (propertyItem !== undefined) {
            list.set(parsedProperty[0], propertyItem);
            propertyItem.actualValue = parsedProperty[1];
            propertyItem.floatValue = parsedProperty[1];
            propertyItem.previousValue = parsedProperty[1];
          } else {
            console.error(propertyItem);
          }
        }
      });
    }
  }

  applyInput(obj: PropertyItem, type) {
    this.applyStyle(obj, type);
    obj.previousValue = obj.actualValue;
    obj.actualValue = obj.floatValue;
  }

  applyStyle(obj, type) {
    if (type === 'main') {
      this.selectedComponent.componentRef.instance.el.nativeElement.style[obj.name] = obj.floatValue;
      this.selectedComponent.style = this.selectedComponent.componentRef.instance.el.nativeElement.style.cssText;
    } else {
      this.selectedComponent.componentRef.instance.childEl.nativeElement.style[obj.name] = obj.floatValue;
      this.selectedComponent.childStyle = this.selectedComponent.componentRef.instance.childEl.nativeElement.style.cssText;
    }
  }

  cancelInput(obj: PropertyItem) {
    obj.floatValue = obj.actualValue;
  }

  filter(value: string, list: Map<string, PropertyItem>): PropertyItem[] {
    const filterValue = value.toLowerCase();

    return Array.from(list.values()).filter(property => property.name.toLowerCase().indexOf(filterValue) === 0);
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
      item.floatValue = obj3;
      this.applyInput(item, obj1);
    } else {
      item = this.allPropertiesList.get(obj2.toLowerCase());
      item.actualValue = obj3;
      item.floatValue = obj3;
      item.previousValue = obj3;
      list.set(obj2.toLowerCase(), item);
      this.applyStyle(item, obj1);
    }
  }
}
