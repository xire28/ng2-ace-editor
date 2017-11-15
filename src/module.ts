import {NgModule} from "@angular/core";
import {AceEditorComponent} from "./component";
import {AceEditorDirective} from "./directive";

const list = [
    AceEditorComponent,
    AceEditorDirective
]

@NgModule({
    declarations: [
        ...list
    ],
    imports: [],
    providers: [],
    exports: list
})
export class AceEditorModule {

}
