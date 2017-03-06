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
var AceEditorComponent = (function () {
    function AceEditorComponent(elementRef) {
        this.textChanged = new core_1.EventEmitter();
        this.textChange = new core_1.EventEmitter();
        this.style = {};
        this._options = {};
        this._readOnly = false;
        this._theme = "monokai";
        this._mode = "html";
        this._autoUpdateContent = true;
        this._durationBeforeCallback = 0;
        this._text = "";
        var el = elementRef.nativeElement;
        this._editor = ace["edit"](el);
        this.init();
        this.initEvents();
    }
    AceEditorComponent.prototype.init = function () {
        this.setOptions(this._options || {});
        this.setTheme(this._theme);
        this.setMode(this._mode);
        this.setReadOnly(this._readOnly);
    };
    AceEditorComponent.prototype.initEvents = function () {
        var me = this;
        me._editor.on('change', function () {
            var newVal = me._editor.getValue();
            if (newVal === me.oldText)
                return;
            if (typeof me.oldText !== 'undefined') {
                if (me._durationBeforeCallback == 0) {
                    me._text = newVal;
                    me.textChange.emit(newVal);
                    me.textChanged.emit(newVal);
                }
                else {
                    if (me.timeoutSaving != null)
                        clearTimeout(me.timeoutSaving);
                    me.timeoutSaving = setTimeout(function () {
                        me._text = newVal;
                        me.textChange.emit(newVal);
                        me.textChanged.emit(newVal);
                        me.timeoutSaving = null;
                    }, me._durationBeforeCallback);
                }
            }
            me.oldText = newVal;
        });
    };
    Object.defineProperty(AceEditorComponent.prototype, "options", {
        set: function (options) {
            this.setOptions(options);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setOptions = function (options) {
        this._options = options;
        this._editor.setOptions(options || {});
    };
    Object.defineProperty(AceEditorComponent.prototype, "readOnly", {
        set: function (readOnly) {
            this.setReadOnly(readOnly);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setReadOnly = function (readOnly) {
        this._readOnly = readOnly;
        this._editor.setReadOnly(readOnly);
    };
    Object.defineProperty(AceEditorComponent.prototype, "theme", {
        set: function (theme) {
            this.setTheme(theme);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setTheme = function (theme) {
        this._theme = theme;
        this._editor.setTheme("ace/theme/" + theme);
    };
    Object.defineProperty(AceEditorComponent.prototype, "mode", {
        set: function (mode) {
            this.setMode(mode);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setMode = function (mode) {
        this._mode = mode;
        if (typeof this._mode == 'object') {
            this._editor.getSession().setMode(this._mode);
        }
        else {
            this._editor.getSession().setMode("ace/mode/" + this._mode);
        }
    };
    Object.defineProperty(AceEditorComponent.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this.setText(text);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setText = function (text) {
        if (this._text != text) {
            if (text == null)
                text = "";
            if (this._autoUpdateContent == true) {
                this._text = text;
                this._editor.setValue(text);
            }
        }
    };
    Object.defineProperty(AceEditorComponent.prototype, "autoUpdateContent", {
        set: function (status) {
            this.setAutoUpdateContent(status);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setAutoUpdateContent = function (status) {
        this._autoUpdateContent = status;
    };
    Object.defineProperty(AceEditorComponent.prototype, "durationBeforeCallback", {
        set: function (num) {
            this.setDurationBeforeCallback(num);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setDurationBeforeCallback = function (num) {
        this._durationBeforeCallback = num;
    };
    AceEditorComponent.prototype.getEditor = function () {
        return this._editor;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AceEditorComponent.prototype, "textChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AceEditorComponent.prototype, "textChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AceEditorComponent.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorComponent.prototype, "options", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorComponent.prototype, "readOnly", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorComponent.prototype, "theme", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorComponent.prototype, "mode", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AceEditorComponent.prototype, "text", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorComponent.prototype, "autoUpdateContent", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], AceEditorComponent.prototype, "durationBeforeCallback", null);
    AceEditorComponent = __decorate([
        core_1.Component({
            selector: 'ace-editor',
            template: '',
            styles: [':host { display:block;width:100%; }']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AceEditorComponent);
    return AceEditorComponent;
}());
exports.AceEditorComponent = AceEditorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBaUUsZUFBZSxDQUFDLENBQUE7QUFDakYsUUFBTyxPQUFPLENBQUMsQ0FBQTtBQUNmLFFBQU8scUJBQXFCLENBQUMsQ0FBQTtBQUM3QixRQUFPLGlCQUFpQixDQUFDLENBQUE7QUFTekI7SUFlSSw0QkFBWSxVQUFzQjtRQWR4QixnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2pDLGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNqQyxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBQzNCLFVBQUssR0FBUSxNQUFNLENBQUM7UUFDcEIsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBRW5DLDRCQUF1QixHQUFXLENBQUMsQ0FBQztRQUNwQyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBS2YsSUFBSSxFQUFFLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGlDQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFD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QUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUM7SUFDckMsQ0FBQztJQUVRLHNCQUFJLHNEQUFzQjthQUExQixVQUEyQixHQUFXO1lBQzNDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUVELHNEQUF5QixHQUF6QixVQUEwQixHQUFXO1FBQ2pDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxHQUFHLENBQUM7SUFDdkMsQ0FBQztJQUVELHNDQUFTLEdBQVQ7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBeElEO1FBQUMsYUFBTSxFQUFFOzsyREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOzswREFBQTtJQUNUO1FBQUMsWUFBSyxFQUFFOztxREFBQTtJQXNEUjtRQUFDLFlBQUssRUFBRTs7O3FEQUFBO0lBU1I7UUFBQyxZQUFLLEVBQUU7OztzREFBQTtJQVNSO1FBQUMsWUFBSyxFQUFFOzs7bURBQUE7SUFTUjtRQUFDLFlBQUssRUFBRTs7O2tEQUFBO0lBY1I7UUFBQyxZQUFLLEVBQUU7O2tEQUFBO0lBcUJSO1FBQUMsWUFBSyxFQUFFOzs7K0RBQUE7SUFRUjtRQUFDLFlBQUssRUFBRTs7O29FQUFBO0lBcElaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFLENBQUMscUNBQXFDLENBQUM7U0FDbEQsQ0FBQzs7MEJBQUE7SUEySUYseUJBQUM7QUFBRCxDQUFDLEFBMUlELElBMElDO0FBMUlZLDBCQUFrQixxQkEwSTlCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIEVsZW1lbnRSZWYsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICdicmFjZSc7XHJcbmltcG9ydCAnYnJhY2UvdGhlbWUvbW9ub2thaSc7XHJcbmltcG9ydCAnYnJhY2UvbW9kZS9odG1sJztcclxuXHJcbmRlY2xhcmUgdmFyIGFjZTogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FjZS1lZGl0b3InLFxyXG4gICAgdGVtcGxhdGU6ICcnLFxyXG4gICAgc3R5bGVzOiBbJzpob3N0IHsgZGlzcGxheTpibG9jazt3aWR0aDoxMDAlOyB9J11cclxufSlcclxuZXhwb3J0IGNsYXNzIEFjZUVkaXRvckNvbXBvbmVudCB7XHJcbiAgICBAT3V0cHV0KCkgdGV4dENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgdGV4dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnkgPSB7fTtcclxuICAgIF9vcHRpb25zOiBhbnkgPSB7fTtcclxuICAgIF9yZWFkT25seTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgX3RoZW1lOiBzdHJpbmcgPSBcIm1vbm9rYWlcIjtcclxuICAgIF9tb2RlOiBhbnkgPSBcImh0bWxcIjtcclxuICAgIF9hdXRvVXBkYXRlQ29udGVudDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBfZWRpdG9yOiBhbnk7XHJcbiAgICBfZHVyYXRpb25CZWZvcmVDYWxsYmFjazogbnVtYmVyID0gMDtcclxuICAgIF90ZXh0OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgb2xkVGV4dDogYW55O1xyXG4gICAgdGltZW91dFNhdmluZzogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcclxuICAgICAgICBsZXQgZWwgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5fZWRpdG9yID0gYWNlW1wiZWRpdFwiXShlbCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHRoaXMuX29wdGlvbnMgfHwge30pO1xyXG4gICAgICAgIHRoaXMuc2V0VGhlbWUodGhpcy5fdGhlbWUpO1xyXG4gICAgICAgIHRoaXMuc2V0TW9kZSh0aGlzLl9tb2RlKTtcclxuICAgICAgICB0aGlzLnNldFJlYWRPbmx5KHRoaXMuX3JlYWRPbmx5KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0RXZlbnRzKCkge1xyXG4gICAgICAgIGxldCBtZSA9IHRoaXM7XHJcblxyXG4gICAgICAgIG1lLl9lZGl0b3Iub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5ld1ZhbCA9IG1lLl9lZGl0b3IuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbCA9PT0gbWUub2xkVGV4dCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lLm9sZFRleHQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWUuX2R1cmF0aW9uQmVmb3JlQ2FsbGJhY2sgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lLl90ZXh0ID0gbmV3VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lLnRleHRDaGFuZ2UuZW1pdChuZXdWYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lLnRleHRDaGFuZ2VkLmVtaXQobmV3VmFsKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lLnRpbWVvdXRTYXZpbmcgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KG1lLnRpbWVvdXRTYXZpbmcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZS50aW1lb3V0U2F2aW5nID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLl90ZXh0ID0gbmV3VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZS50ZXh0Q2hhbmdlLmVtaXQobmV3VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWUudGV4dENoYW5nZWQuZW1pdChuZXdWYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZS50aW1lb3V0U2F2aW5nID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9LCBtZS5fZHVyYXRpb25CZWZvcmVDYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWUub2xkVGV4dCA9IG5ld1ZhbDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0T3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLl9lZGl0b3Iuc2V0T3B0aW9ucyhvcHRpb25zIHx8IHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgcmVhZE9ubHkocmVhZE9ubHk6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0UmVhZE9ubHkocmVhZE9ubHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFJlYWRPbmx5KHJlYWRPbmx5OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9yZWFkT25seSA9IHJlYWRPbmx5O1xyXG4gICAgICAgIHRoaXMuX2VkaXRvci5zZXRSZWFkT25seShyZWFkT25seSk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IHRoZW1lKHRoZW1lOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNldFRoZW1lKHRoZW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaGVtZSh0aGVtZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdGhlbWUgPSB0aGVtZTtcclxuICAgICAgICB0aGlzLl9lZGl0b3Iuc2V0VGhlbWUoYGFjZS90aGVtZS8ke3RoZW1lfWApO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBtb2RlKG1vZGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0TW9kZShtb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RlKG1vZGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX21vZGUgPSBtb2RlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fbW9kZSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLl9lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUodGhpcy5fbW9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoYGFjZS9tb2RlLyR7dGhpcy5fbW9kZX1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGdldCB0ZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB0ZXh0KHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2V0VGV4dCh0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUZXh0KHRleHQ6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLl90ZXh0ICE9IHRleHQpIHtcclxuICAgICAgICAgICAgaWYgKHRleHQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2F1dG9VcGRhdGVDb250ZW50ID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yLnNldFZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBhdXRvVXBkYXRlQ29udGVudChzdGF0dXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0QXV0b1VwZGF0ZUNvbnRlbnQoc3RhdHVzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBdXRvVXBkYXRlQ29udGVudChzdGF0dXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2F1dG9VcGRhdGVDb250ZW50ID0gc3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBkdXJhdGlvbkJlZm9yZUNhbGxiYWNrKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXREdXJhdGlvbkJlZm9yZUNhbGxiYWNrKG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RHVyYXRpb25CZWZvcmVDYWxsYmFjayhudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2R1cmF0aW9uQmVmb3JlQ2FsbGJhY2sgPSBudW07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWRpdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3I7XHJcbiAgICB9XHJcbn1cclxuIl19