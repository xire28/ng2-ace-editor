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
var forms_1 = require('@angular/forms');
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
        this._onChange = function (_) { };
        this._onTouched = function () { };
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
        var _this = this;
        this._editor.on('change', function () { return _this.updateText(); });
        this._editor.on('paste', function () { return _this.updateText(); });
    };
    AceEditorComponent.prototype.updateText = function () {
        var newVal = this._editor.getValue(), that = this;
        if (newVal === this.oldText) {
            return;
        }
        if (typeof this.oldText !== 'undefined') {
            if (!this._durationBeforeCallback) {
                this._text = newVal;
                this.textChange.emit(newVal);
                this.textChanged.emit(newVal);
                this._onChange(newVal);
            }
            else {
                if (this.timeoutSaving) {
                    clearTimeout(this.timeoutSaving);
                }
                this.timeoutSaving = setTimeout(function () {
                    that._text = newVal;
                    that.textChange.emit(newVal);
                    that.textChanged.emit(newVal);
                    that.timeoutSaving = null;
                }, this._durationBeforeCallback);
            }
        }
        this.oldText = newVal;
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
        if (typeof this._mode === 'object') {
            this._editor.getSession().setMode(this._mode);
        }
        else {
            this._editor.getSession().setMode("ace/mode/" + this._mode);
        }
    };
    Object.defineProperty(AceEditorComponent.prototype, "value", {
        get: function () {
            return this.text;
        },
        set: function (value) {
            this.setText(value);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.writeValue = function (value) {
        this.setText(value);
    };
    AceEditorComponent.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    AceEditorComponent.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
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
        if (text === null || text === undefined) {
            text = "";
        }
        if (this._text !== text && this._autoUpdateContent === true) {
            this._text = text;
            this._editor.setValue(text);
            this._onChange(text);
            this._editor.clearSelection();
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
    ], AceEditorComponent.prototype, "value", null);
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
            styles: [':host { display:block;width:100%; }'],
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return AceEditorComponent; }),
                    multi: true
                }]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AceEditorComponent);
    return AceEditorComponent;
}());
exports.AceEditorComponent = AceEditorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkUsZUFBZSxDQUFDLENBQUE7QUFDN0Ysc0JBQXNELGdCQUFnQixDQUFDLENBQUE7QUFDdkUsUUFBTyxPQUFPLENBQUMsQ0FBQTtBQUNmLFFBQU8scUJBQXFCLENBQUMsQ0FBQTtBQUM3QixRQUFPLGlCQUFpQixDQUFDLENBQUE7QUFjekI7SUFlSSw0QkFBWSxVQUFzQjtRQWR4QixnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2pDLGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNqQyxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBQzNCLFVBQUssR0FBUSxNQUFNLENBQUM7UUFDcEIsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBRW5DLDRCQUF1QixHQUFXLENBQUMsQ0FBQztRQUNwQyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBb0dYLGNBQVMsR0FBRyxVQUFDLENBQU0sSUFBTyxDQUFDLENBQUM7UUFJNUIsZUFBVSxHQUFHLGNBQVEsQ0FBQyxDQUFDO1FBbkczQixJQUFJLEVBQUUsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsaUNBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENB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Q0FBQzs7O09BQUE7SUFFRCxzREFBeUIsR0FBekIsVUFBMEIsR0FBVztRQUNqQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsR0FBRyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxzQ0FBUyxHQUFUO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQTdKRDtRQUFDLGFBQU0sRUFBRTs7MkRBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7MERBQUE7SUFDVDtRQUFDLFlBQUssRUFBRTs7cURBQUE7SUF5RFI7UUFBQyxZQUFLLEVBQUU7OztxREFBQTtJQVNSO1FBQUMsWUFBSyxFQUFFOzs7c0RBQUE7SUFTUjtRQUFDLFlBQUssRUFBRTs7O21EQUFBO0lBU1I7UUFBQyxZQUFLLEVBQUU7OztrREFBQTtJQWdCUjtRQUFDLFlBQUssRUFBRTs7bURBQUE7SUFvQlI7UUFBQyxZQUFLLEVBQUU7O2tEQUFBO0lBaUJSO1FBQUMsWUFBSyxFQUFFOzs7K0RBQUE7SUFRUjtRQUFDLFlBQUssRUFBRTs7O29FQUFBO0lBOUpaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFLENBQUMscUNBQXFDLENBQUM7WUFDL0MsU0FBUyxFQUFFLENBQUM7b0JBQ1IsT0FBTyxFQUFFLHlCQUFpQjtvQkFDMUIsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDO29CQUNqRCxLQUFLLEVBQUUsSUFBSTtpQkFDZCxDQUFDO1NBQ0wsQ0FBQzs7MEJBQUE7SUFnS0YseUJBQUM7QUFBRCxDQUFDLEFBL0pELElBK0pDO0FBL0pZLDBCQUFrQixxQkErSjlCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIEVsZW1lbnRSZWYsIElucHV0LCBmb3J3YXJkUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0ICdicmFjZSc7XHJcbmltcG9ydCAnYnJhY2UvdGhlbWUvbW9ub2thaSc7XHJcbmltcG9ydCAnYnJhY2UvbW9kZS9odG1sJztcclxuXHJcbmRlY2xhcmUgdmFyIGFjZTogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FjZS1lZGl0b3InLFxyXG4gICAgdGVtcGxhdGU6ICcnLFxyXG4gICAgc3R5bGVzOiBbJzpob3N0IHsgZGlzcGxheTpibG9jazt3aWR0aDoxMDAlOyB9J10sXHJcbiAgICBwcm92aWRlcnM6IFt7XHJcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWNlRWRpdG9yQ29tcG9uZW50KSxcclxuICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFjZUVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICAgIEBPdXRwdXQoKSB0ZXh0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSB0ZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueSA9IHt9O1xyXG4gICAgX29wdGlvbnM6IGFueSA9IHt9O1xyXG4gICAgX3JlYWRPbmx5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfdGhlbWU6IHN0cmluZyA9IFwibW9ub2thaVwiO1xyXG4gICAgX21vZGU6IGFueSA9IFwiaHRtbFwiO1xyXG4gICAgX2F1dG9VcGRhdGVDb250ZW50OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIF9lZGl0b3I6IGFueTtcclxuICAgIF9kdXJhdGlvbkJlZm9yZUNhbGxiYWNrOiBudW1iZXIgPSAwO1xyXG4gICAgX3RleHQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBvbGRUZXh0OiBhbnk7XHJcbiAgICB0aW1lb3V0U2F2aW5nOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xyXG4gICAgICAgIGxldCBlbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgICB0aGlzLl9lZGl0b3IgPSBhY2VbXCJlZGl0XCJdKGVsKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0RXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNldE9wdGlvbnModGhpcy5fb3B0aW9ucyB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5zZXRUaGVtZSh0aGlzLl90aGVtZSk7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlKHRoaXMuX21vZGUpO1xyXG4gICAgICAgIHRoaXMuc2V0UmVhZE9ubHkodGhpcy5fcmVhZE9ubHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5fZWRpdG9yLm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLnVwZGF0ZVRleHQoKSk7XHJcbiAgICAgICAgdGhpcy5fZWRpdG9yLm9uKCdwYXN0ZScsICgpID0+IHRoaXMudXBkYXRlVGV4dCgpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlVGV4dCgpIHtcclxuICAgICAgICBsZXQgbmV3VmFsID0gdGhpcy5fZWRpdG9yLmdldFZhbHVlKCksIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGlmIChuZXdWYWwgPT09IHRoaXMub2xkVGV4dCkgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMub2xkVGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9kdXJhdGlvbkJlZm9yZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0ID0gbmV3VmFsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q2hhbmdlLmVtaXQobmV3VmFsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENoYW5nZWQuZW1pdChuZXdWYWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UobmV3VmFsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVvdXRTYXZpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0U2F2aW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRTYXZpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90ZXh0ID0gbmV3VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudGV4dENoYW5nZS5lbWl0KG5ld1ZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50ZXh0Q2hhbmdlZC5lbWl0KG5ld1ZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50aW1lb3V0U2F2aW5nID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMuX2R1cmF0aW9uQmVmb3JlQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub2xkVGV4dCA9IG5ld1ZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0T3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLl9lZGl0b3Iuc2V0T3B0aW9ucyhvcHRpb25zIHx8IHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgcmVhZE9ubHkocmVhZE9ubHk6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0UmVhZE9ubHkocmVhZE9ubHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFJlYWRPbmx5KHJlYWRPbmx5OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9yZWFkT25seSA9IHJlYWRPbmx5O1xyXG4gICAgICAgIHRoaXMuX2VkaXRvci5zZXRSZWFkT25seShyZWFkT25seSk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IHRoZW1lKHRoZW1lOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNldFRoZW1lKHRoZW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaGVtZSh0aGVtZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdGhlbWUgPSB0aGVtZTtcclxuICAgICAgICB0aGlzLl9lZGl0b3Iuc2V0VGhlbWUoYGFjZS90aGVtZS8ke3RoZW1lfWApO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBtb2RlKG1vZGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0TW9kZShtb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RlKG1vZGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX21vZGUgPSBtb2RlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fbW9kZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKHRoaXMuX21vZGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShgYWNlL21vZGUvJHt0aGlzLl9tb2RlfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHQ7XHJcbiAgICB9XHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNldFRleHQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNldFRleHQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4geyB9O1xyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgdGV4dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcclxuICAgIH1cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgdGV4dCh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNldFRleHQodGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGV4dCh0ZXh0OiBhbnkpIHtcclxuICAgICAgICBpZiAodGV4dCA9PT0gbnVsbCB8fCB0ZXh0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGV4dCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl90ZXh0ICE9PSB0ZXh0ICYmIHRoaXMuX2F1dG9VcGRhdGVDb250ZW50ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICB0aGlzLl9lZGl0b3Iuc2V0VmFsdWUodGV4dCk7XHJcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKHRleHQpO1xyXG4gICAgICAgICAgICB0aGlzLl9lZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IGF1dG9VcGRhdGVDb250ZW50KHN0YXR1czogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRBdXRvVXBkYXRlQ29udGVudChzdGF0dXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEF1dG9VcGRhdGVDb250ZW50KHN0YXR1czogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fYXV0b1VwZGF0ZUNvbnRlbnQgPSBzdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IGR1cmF0aW9uQmVmb3JlQ2FsbGJhY2sobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNldER1cmF0aW9uQmVmb3JlQ2FsbGJhY2sobnVtKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREdXJhdGlvbkJlZm9yZUNhbGxiYWNrKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZHVyYXRpb25CZWZvcmVDYWxsYmFjayA9IG51bTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRFZGl0b3IoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvcjtcclxuICAgIH1cclxufVxyXG4iXX0=