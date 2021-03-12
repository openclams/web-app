import { Config } from './config';
import { SequenceConfig } from './sequence-config';
import 'mxgraph/javascript/mxClient.js';
import { UseCaseConfig } from './use-case-config';
import { Style } from '../style';

declare var mxConstants: any;

export class Styles {

  public static state(): Style {
    const style = new Style();
    style[mxConstants.STYLE_FILLCOLOR] = UseCaseConfig.ACTIVITY_FILL_COLOR;
    style[mxConstants.STYLE_STROKECOLOR] = UseCaseConfig.ACTIVITY_STROKE_COLOR;
    style[mxConstants.STYLE_STROKEWIDTH] = UseCaseConfig.ACTIVITY_STROKE_WIDTH;
    style[mxConstants.STYLE_FONTCOLOR] = UseCaseConfig.ACTIVITY_FONT_COLOR;
    style[mxConstants.STYLE_FONTSIZE] = UseCaseConfig.ACTIVITY_FONT_SIZE;
    style[mxConstants.STYLE_EDITABLE] = 0;
    return style;
  }

  public static dot(): Style {
    const style = new Style();
    style[mxConstants.STYLE_FILLCOLOR] = Config.BLACK;
    style[mxConstants.STYLE_FONTCOLOR] = Config.BLACK;
    style[mxConstants.STYLE_FONTSIZE] = 16;
    style[mxConstants.STYLE_STROKECOLOR] = Config.BLACK;
    style[mxConstants.OUTLINE_HIGHLIGHT_COLOR] = Config.NEON_GREEN;
    style[mxConstants.STYLE_SHAPE] = 'doubleEllipse';
    style[mxConstants.STYLE_MOVABLE] = 1;
    style[mxConstants.STYLE_EDITABLE] = 0;
    return style;
  }

  public static arrow(): Style {
    const style = new Style();
    style[mxConstants.STYLE_FILLCOLOR] = Config.WHITE;
    style[mxConstants.STYLE_FONTCOLOR] = Config.BLACK;
    style[mxConstants.STYLE_FONTSIZE] = 16;
    style[mxConstants.STYLE_STROKECOLOR] = Config.BLACK;
    style[mxConstants.OUTLINE_HIGHLIGHT_COLOR] = Config.NEON_GREEN;
    style[mxConstants.ARROW_WIDTH] = 1;
    return style;
  }

  public static redArrow(): Style {
    const style = new Style();
    style[mxConstants.STYLE_FILLCOLOR] = Config.WHITE;
    style[mxConstants.STYLE_FONTCOLOR] = Config.WARN_RED;
    style[mxConstants.STYLE_FONTSIZE] = 16;
    style[mxConstants.STYLE_STROKECOLOR] = Config.BLACK;
    style[mxConstants.OUTLINE_HIGHLIGHT_COLOR] = Config.WARN_RED;
    style[mxConstants.ARROW_WIDTH] = 1;
    return style;
  }

  public static instance(img: string): Style {
    const style = new Style();
    style[mxConstants.STYLE_FILLCOLOR] = Config.WHITE;
    style[mxConstants.STYLE_FONTCOLOR] = Config.BLACK;
    style[mxConstants.STYLE_FONTSIZE] = 24;
    style[mxConstants.STYLE_STROKECOLOR] = Config.BLACK;
    style[mxConstants.OUTLINE_HIGHLIGHT_COLOR] = Config.NEON_GREEN;
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    style[mxConstants.STYLE_IMAGE] = img;
    style[mxConstants.STYLE_NOLABEL] = 1;
    style[mxConstants.STYLE_EDITABLE] = 0;
    return style;
  }

  public static instanceLabel(): Style {
    const style = new Style();
    style['resizable'] = 0;
    style['autosize'] = 1;
    style[mxConstants.STYLE_FONTSIZE] = 12;
    style[mxConstants.STYLE_FILLCOLOR] = Config.NONE;
    style[mxConstants.STYLE_FONTCOLOR] = Config.BLACK;
    style[mxConstants.STYLE_STROKECOLOR] = Config.NONE;
    style[mxConstants.STYLE_NOLABEL] = 0;
    style['connectable'] = 0;
    style['editable'] = 0;
    style[mxConstants.STYLE_MOVABLE] = 0;
    return style;
  }

  public static lifeline(): Style {
    const style = new Style();
    style[mxConstants.STYLE_FILLCOLOR] = Config.WHITE;
    style[mxConstants.STYLE_FONTCOLOR] = Config.BLACK;
    style[mxConstants.STYLE_FONTSIZE] = 16;
    style[mxConstants.STYLE_STROKECOLOR] = Config.BLACK;
    style[mxConstants.OUTLINE_HIGHLIGHT_COLOR] = Config.NEON_GREEN;
    style[mxConstants.EDGE_SELECTION_COLOR] = Config.NONE;
    style[mxConstants.VERTEX_SELECTION_COLOR] = Config.NONE;
    style[mxConstants.VERTEX_SELECTION_STROKEWIDTH] = 0;
    style[mxConstants.EDGE_SELECTION_STROKEWIDTH] = 0;
    // style[mxConstants.STYLE_MOVABLE]=0;
    return style;
  }

  public static template(): Style {
    const style = new Style();
    style[mxConstants.STYLE_FILLCOLOR] = Config.WHITE;
    style[mxConstants.STYLE_FONTCOLOR] = Config.BLACK;
    style[mxConstants.STYLE_FONTSIZE] = 16;
    style[mxConstants.STYLE_STROKECOLOR] = Config.BLACK;
    style['strokeWidth'] = SequenceConfig.TEMPLATE_BOX_STROKE_WIDTH;
    style['dashed'] = ' + 1 + ';
    style['dashPattern'] = '3 3';
    style['rounded'] = 1;
    return style;
  }

  public static templateIcon(img): Style {
    const style = new Style();
    style[mxConstants.STYLE_STROKECOLOR] = Config.BLACK;
    style[mxConstants.STYLE_FILLCOLOR] = Config.WHITE;
    style['resizable'] = 0;
    // style["autosize"]=1;
    style[mxConstants.STYLE_MOVABLE] = 0;
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    style[mxConstants.STYLE_IMAGE] = img;
    style['labelPosition'] = 'right';
    style[mxConstants.STYLE_FONTCOLOR] = Config.BLACK;
    style['align'] = 'left';
    return style;
  }

  public static templateLabel(): Style {
    const style = new Style();
    style[mxConstants.STYLE_STROKECOLOR] = Config.BLACK;
    style[mxConstants.STYLE_FILLCOLOR] = Config.WHITE;
    style['resizable'] = 0;
    style['autosize'] = 1;
    style[mxConstants.STYLE_NOLABEL] = 1;
    return style;
  }

  public static message(): Style {
    const style = new Style();
    style[mxConstants.STYLE_FILLCOLOR] = Config.WHITE;
    style[mxConstants.STYLE_FONTCOLOR] = Config.BLACK;
    style[mxConstants.STYLE_FONTSIZE] = 16;
    style[mxConstants.STYLE_STROKECOLOR] = Config.BLACK;
    style[mxConstants.OUTLINE_HIGHLIGHT_COLOR] = Config.NEON_GREEN;
    style[mxConstants.ARROW_WIDTH] = 1;
    style['exitX'] = 0;
    style['exitY'] = 0.5;
    style['exitDx'] = 0;
    style['exitDy'] = 0;
    style['exitPerimeter'] = 0;
    style['entryX'] = 0;
    style['entryY'] = 0.5;
    style['entryDx'] = 0;
    style['entryDy'] = 0;
    style['entryPerimeter'] = 0;
    return style;
  }
}
