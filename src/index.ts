import {AceEditorDirective} from './directive';
import {AceEditorComponent} from './component';
import {AceEditorModule} from './module';

export {AceEditorModule, AceEditorDirective, AceEditorComponent};

declare var ace: any;
ace.config.set('basePath', 'node_modules/ace-builds/src-min/');
