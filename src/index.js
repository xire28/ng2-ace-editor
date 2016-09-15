"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('brace');
require('brace/theme/monokai');
require('brace/mode/html');
var AceEditorDirective = (function () {
    function AceEditorDirective(elementRef) {
        this.textChanged = new core_1.EventEmitter();
        this._options = {};
        this._readOnly = false;
        this._theme = "monokai";
        this._mode = "html";
        this._autoUpdateContent = true;
        var el = elementRef.nativeElement;
        this.editor = ace["edit"](el);
        this.init();
        this.initEvents();
    }
    AceEditorDirective.prototype.init = function () {
        this.editor.setOptions(this._options || {});
        this.editor.setTheme("ace/theme/" + this._theme);
        this.editor.getSession().setMode("ace/mode/" + this._mode);
        this.editor.setReadOnly(this._readOnly);
    };
    AceEditorDirective.prototype.initEvents = function () {
        var _this = this;
        this.editor.on('change', function () {
            var newVal = _this.editor.getValue();
            if (newVal === _this.oldText)
                return;
            if (typeof _this.oldText !== 'undefined')
                _this.textChanged.emit(newVal);
            _this.oldText = newVal;
        });
    };
    Object.defineProperty(AceEditorDirective.prototype, "options", {
        set: function (options) {
            this._options = options;
            this.editor.setOptions(options || {});
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AceEditorDirective.prototype, "readOnly", {
        set: function (readOnly) {
            this._readOnly = readOnly;
            this.editor.setReadOnly(readOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AceEditorDirective.prototype, "theme", {
        set: function (theme) {
            this._theme = theme;
            this.editor.setTheme("ace/theme/" + theme);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AceEditorDirective.prototype, "mode", {
        set: function (mode) {
            this._mode = mode;
            this.editor.getSession().setMode("ace/mode/" + mode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AceEditorDirective.prototype, "text", {
        set: function (text) {
            if (text == null)
                text = "";
            if (this._autoUpdateContent == true) {
                this.editor.setValue(text);
                this.editor.clearSelection();
                this.editor.focus();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AceEditorDirective.prototype, "autoUpdateContent", {
        set: function (status) {
            this._autoUpdateContent = status;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output('textChanged'), 
        __metadata('design:type', Object)
    ], AceEditorDirective.prototype, "textChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "options", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "readOnly", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "theme", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "mode", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "text", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "autoUpdateContent", null);
    AceEditorDirective = __decorate([
        core_1.Directive({
            selector: '[ace-editor]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AceEditorDirective);
    return AceEditorDirective;
}());
exports.AceEditorDirective = AceEditorDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQW1FLGVBQWUsQ0FBQyxDQUFBO0FBQ25GLFFBQU8sT0FBTyxDQUFDLENBQUE7QUFDZixRQUFPLHFCQUFxQixDQUFDLENBQUE7QUFDN0IsUUFBTyxpQkFBaUIsQ0FBQyxDQUFBO0FBT3pCO0lBVUUsNEJBQVksVUFBc0I7UUFUWCxnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3hELGFBQVEsR0FBTyxFQUFFLENBQUM7UUFDbEIsY0FBUyxHQUFXLEtBQUssQ0FBQztRQUMxQixXQUFNLEdBQVUsU0FBUyxDQUFDO1FBQzFCLFVBQUssR0FBVSxNQUFNLENBQUM7UUFDdEIsdUJBQWtCLEdBQVcsSUFBSSxDQUFDO1FBS2hDLElBQUksRUFBRSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFOUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxpQ0FBSSxHQUFKO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFhLElBQUksQ0FBQyxNQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFZLElBQUksQ0FBQyxLQUFPLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELHVDQUFVLEdBQVY7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN2QixJQUFJLE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BDLEVBQUUsQ0FBQSxDQUFDLE1BQU0sS0FBSyxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUNuQyxFQUFFLENBQUEsQ0FBQyxPQUFPLEtBQUksQ0FBQyxPQUFPLEtBQUssV0FBVyxDQUFDO2dCQUNyQyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxLQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUSxzQkFBSSx1Q0FBTzthQUFYLFVBQVksT0FBWTtZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFFUSxzQkFBSSx3Q0FBUTthQUFaLFVBQWEsUUFBYTtZQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUVRLHNCQUFJLHFDQUFLO2FBQVQsVUFBVSxLQUFVO1lBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWEsS0FBTyxDQUFDLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFFUSxzQkFBSSxvQ0FBSTthQUFSLFVBQVMsSUFBUztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFZLElBQU0sQ0FBQyxDQUFDO1FBQ3ZELENBQUM7OztPQUFBO0lBRVEsc0JBQUksb0NBQUk7YUFBUixVQUFTLElBQVM7WUFDdkIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFDWixJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRWQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDOzs7T0FBQTtJQUVRLHNCQUFJLGlEQUFpQjthQUFyQixVQUFzQixNQUFXO1lBQ3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFuRUQ7UUFBQyxhQUFNLENBQUMsYUFBYSxDQUFDOzsyREFBQTtJQWtDdEI7UUFBQyxZQUFLLEVBQUU7OztxREFBQTtJQUtSO1FBQUMsWUFBSyxFQUFFOzs7c0RBQUE7SUFLUjtRQUFDLFlBQUssRUFBRTs7O21EQUFBO0lBS1I7UUFBQyxZQUFLLEVBQUU7OztrREFBQTtJQUtSO1FBQUMsWUFBSyxFQUFFOzs7a0RBQUE7SUFXUjtRQUFDLFlBQUssRUFBRTs7OytEQUFBO0lBckVWO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1NBQ3pCLENBQUM7OzBCQUFBO0lBc0VGLHlCQUFDO0FBQUQsQ0FBQyxBQXJFRCxJQXFFQztBQXJFWSwwQkFBa0IscUJBcUU5QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICdicmFjZSc7XHJcbmltcG9ydCAnYnJhY2UvdGhlbWUvbW9ub2thaSc7XHJcbmltcG9ydCAnYnJhY2UvbW9kZS9odG1sJztcclxuXHJcbmRlY2xhcmUgdmFyIGFjZTphbnk7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thY2UtZWRpdG9yXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFjZUVkaXRvckRpcmVjdGl2ZSB7XHJcbiAgQE91dHB1dCgndGV4dENoYW5nZWQnKSB0ZXh0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBfb3B0aW9uczphbnkgPSB7fTtcclxuICBfcmVhZE9ubHk6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gIF90aGVtZTpzdHJpbmcgPSBcIm1vbm9rYWlcIjtcclxuICBfbW9kZTpzdHJpbmcgPSBcImh0bWxcIjtcclxuICBfYXV0b1VwZGF0ZUNvbnRlbnQ6Ym9vbGVhbiA9IHRydWU7XHJcbiAgZWRpdG9yOmFueTtcclxuICBvbGRUZXh0OmFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xyXG4gICAgbGV0IGVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5lZGl0b3IgPSBhY2VbXCJlZGl0XCJdKGVsKTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMuZWRpdG9yLnNldE9wdGlvbnModGhpcy5fb3B0aW9ucyB8fCB7fSk7XHJcbiAgICB0aGlzLmVkaXRvci5zZXRUaGVtZShgYWNlL3RoZW1lLyR7dGhpcy5fdGhlbWV9YCk7XHJcbiAgICB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShgYWNlL21vZGUvJHt0aGlzLl9tb2RlfWApO1xyXG4gICAgdGhpcy5lZGl0b3Iuc2V0UmVhZE9ubHkodGhpcy5fcmVhZE9ubHkpO1xyXG4gIH1cclxuXHJcbiAgaW5pdEV2ZW50cygpIHtcclxuICAgIHRoaXMuZWRpdG9yLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgIGxldCBuZXdWYWwgPSB0aGlzLmVkaXRvci5nZXRWYWx1ZSgpO1xyXG4gICAgICBpZihuZXdWYWwgPT09IHRoaXMub2xkVGV4dCkgcmV0dXJuO1xyXG4gICAgICBpZih0eXBlb2YgdGhpcy5vbGRUZXh0ICE9PSAndW5kZWZpbmVkJylcclxuICAgICAgICB0aGlzLnRleHRDaGFuZ2VkLmVtaXQobmV3VmFsKTtcclxuICAgICAgdGhpcy5vbGRUZXh0ID0gbmV3VmFsO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9ucyhvcHRpb25zIHx8IHt9KTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCByZWFkT25seShyZWFkT25seTogYW55KSB7XHJcbiAgICB0aGlzLl9yZWFkT25seSA9IHJlYWRPbmx5O1xyXG4gICAgdGhpcy5lZGl0b3Iuc2V0UmVhZE9ubHkocmVhZE9ubHkpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IHRoZW1lKHRoZW1lOiBhbnkpIHtcclxuICAgIHRoaXMuX3RoZW1lID0gdGhlbWU7XHJcbiAgICB0aGlzLmVkaXRvci5zZXRUaGVtZShgYWNlL3RoZW1lLyR7dGhlbWV9YCk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgbW9kZShtb2RlOiBhbnkpIHtcclxuICAgIHRoaXMuX21vZGUgPSBtb2RlO1xyXG4gICAgdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoYGFjZS9tb2RlLyR7bW9kZX1gKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCB0ZXh0KHRleHQ6IGFueSkge1xyXG4gICAgICBpZih0ZXh0ID09IG51bGwpXHJcbiAgICAgICAgICB0ZXh0ID0gXCJcIjtcclxuXHJcbiAgICAgIGlmKHRoaXMuX2F1dG9VcGRhdGVDb250ZW50ID09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuZWRpdG9yLnNldFZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgdGhpcy5lZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBhdXRvVXBkYXRlQ29udGVudChzdGF0dXM6IGFueSkge1xyXG4gICAgICB0aGlzLl9hdXRvVXBkYXRlQ29udGVudCA9IHN0YXR1cztcclxuICB9XHJcbn1cclxuIl19