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
        if (text == null)
            text = "";
        if (this._autoUpdateContent == true) {
            this._text = text;
            this._editor.setValue(text);
            this._editor.clearSelection();
            this._editor.focus();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBaUUsZUFBZSxDQUFDLENBQUE7QUFDakYsUUFBTyxPQUFPLENBQUMsQ0FBQTtBQUNmLFFBQU8scUJBQXFCLENBQUMsQ0FBQTtBQUM3QixRQUFPLGlCQUFpQixDQUFDLENBQUE7QUFTekI7SUFlSSw0QkFBWSxVQUFzQjtRQWR4QixnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2pDLGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNqQyxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBQzNCLFVBQUssR0FBUSxNQUFNLENBQUM7UUFDcEIsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBRW5DLDRCQUF1QixHQUFXLENBQUMsQ0FBQztRQUNwQyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBS2YsSUFBSSxFQUFFLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGlDQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFD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UUFDNUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQztJQUNyQyxDQUFDO0lBRVEsc0JBQUksc0RBQXNCO2FBQTFCLFVBQTJCLEdBQVc7WUFDM0MsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7OztPQUFBO0lBRUQsc0RBQXlCLEdBQXpCLFVBQTBCLEdBQVc7UUFDakMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztJQUN2QyxDQUFDO0lBRUQsc0NBQVMsR0FBVDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUF2SUQ7UUFBQyxhQUFNLEVBQUU7OzJEQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7OzBEQUFBO0lBQ1Q7UUFBQyxZQUFLLEVBQUU7O3FEQUFBO0lBc0RSO1FBQUMsWUFBSyxFQUFFOzs7cURBQUE7SUFTUjtRQUFDLFlBQUssRUFBRTs7O3NEQUFBO0lBU1I7UUFBQyxZQUFLLEVBQUU7OzttREFBQTtJQVNSO1FBQUMsWUFBSyxFQUFFOzs7a0RBQUE7SUFjUjtRQUFDLFlBQUssRUFBRTs7a0RBQUE7SUFvQlI7UUFBQyxZQUFLLEVBQUU7OzsrREFBQTtJQVFSO1FBQUMsWUFBSyxFQUFFOzs7b0VBQUE7SUFuSVo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQztTQUNsRCxDQUFDOzswQkFBQTtJQTBJRix5QkFBQztBQUFELENBQUMsQUF6SUQsSUF5SUM7QUF6SVksMEJBQWtCLHFCQXlJOUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgJ2JyYWNlJztcclxuaW1wb3J0ICdicmFjZS90aGVtZS9tb25va2FpJztcclxuaW1wb3J0ICdicmFjZS9tb2RlL2h0bWwnO1xyXG5cclxuZGVjbGFyZSB2YXIgYWNlOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYWNlLWVkaXRvcicsXHJcbiAgICB0ZW1wbGF0ZTogJycsXHJcbiAgICBzdHlsZXM6IFsnOmhvc3QgeyBkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7IH0nXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWNlRWRpdG9yQ29tcG9uZW50IHtcclxuICAgIEBPdXRwdXQoKSB0ZXh0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSB0ZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueSA9IHt9O1xyXG4gICAgX29wdGlvbnM6IGFueSA9IHt9O1xyXG4gICAgX3JlYWRPbmx5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfdGhlbWU6IHN0cmluZyA9IFwibW9ub2thaVwiO1xyXG4gICAgX21vZGU6IGFueSA9IFwiaHRtbFwiO1xyXG4gICAgX2F1dG9VcGRhdGVDb250ZW50OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIF9lZGl0b3I6IGFueTtcclxuICAgIF9kdXJhdGlvbkJlZm9yZUNhbGxiYWNrOiBudW1iZXIgPSAwO1xyXG4gICAgX3RleHQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBvbGRUZXh0OiBhbnk7XHJcbiAgICB0aW1lb3V0U2F2aW5nOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xyXG4gICAgICAgIGxldCBlbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgICB0aGlzLl9lZGl0b3IgPSBhY2VbXCJlZGl0XCJdKGVsKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0RXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNldE9wdGlvbnModGhpcy5fb3B0aW9ucyB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5zZXRUaGVtZSh0aGlzLl90aGVtZSk7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlKHRoaXMuX21vZGUpO1xyXG4gICAgICAgIHRoaXMuc2V0UmVhZE9ubHkodGhpcy5fcmVhZE9ubHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRFdmVudHMoKSB7XHJcbiAgICAgICAgbGV0IG1lID0gdGhpcztcclxuXHJcbiAgICAgICAgbWUuX2VkaXRvci5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmV3VmFsID0gbWUuX2VkaXRvci5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsID09PSBtZS5vbGRUZXh0KSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWUub2xkVGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZS5fZHVyYXRpb25CZWZvcmVDYWxsYmFjayA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWUuX3RleHQgPSBuZXdWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgbWUudGV4dENoYW5nZS5lbWl0KG5ld1ZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWUudGV4dENoYW5nZWQuZW1pdChuZXdWYWwpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWUudGltZW91dFNhdmluZyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobWUudGltZW91dFNhdmluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1lLnRpbWVvdXRTYXZpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWUuX3RleHQgPSBuZXdWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLnRleHRDaGFuZ2UuZW1pdChuZXdWYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZS50ZXh0Q2hhbmdlZC5lbWl0KG5ld1ZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLnRpbWVvdXRTYXZpbmcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIG1lLl9kdXJhdGlvbkJlZm9yZUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZS5vbGRUZXh0ID0gbmV3VmFsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRPcHRpb25zKG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIHRoaXMuX2VkaXRvci5zZXRPcHRpb25zKG9wdGlvbnMgfHwge30pO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCByZWFkT25seShyZWFkT25seTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRSZWFkT25seShyZWFkT25seSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UmVhZE9ubHkocmVhZE9ubHk6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3JlYWRPbmx5ID0gcmVhZE9ubHk7XHJcbiAgICAgICAgdGhpcy5fZWRpdG9yLnNldFJlYWRPbmx5KHJlYWRPbmx5KTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgdGhlbWUodGhlbWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0VGhlbWUodGhlbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRoZW1lKHRoZW1lOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl90aGVtZSA9IHRoZW1lO1xyXG4gICAgICAgIHRoaXMuX2VkaXRvci5zZXRUaGVtZShgYWNlL3RoZW1lLyR7dGhlbWV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IG1vZGUobW9kZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlKG1vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGUobW9kZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9tb2RlID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZSh0aGlzLl9tb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShgYWNlL21vZGUvJHt0aGlzLl9tb2RlfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHRleHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XHJcbiAgICB9XHJcbiAgICBzZXQgdGV4dCh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNldFRleHQodGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGV4dCh0ZXh0OiBhbnkpIHtcclxuICAgICAgICBpZiAodGV4dCA9PSBudWxsKVxyXG4gICAgICAgICAgICB0ZXh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9VcGRhdGVDb250ZW50ID09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IHRleHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvci5zZXRWYWx1ZSh0ZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5fZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvci5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgYXV0b1VwZGF0ZUNvbnRlbnQoc3RhdHVzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNldEF1dG9VcGRhdGVDb250ZW50KHN0YXR1cyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QXV0b1VwZGF0ZUNvbnRlbnQoc3RhdHVzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9hdXRvVXBkYXRlQ29udGVudCA9IHN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgZHVyYXRpb25CZWZvcmVDYWxsYmFjayhudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2V0RHVyYXRpb25CZWZvcmVDYWxsYmFjayhudW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldER1cmF0aW9uQmVmb3JlQ2FsbGJhY2sobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9kdXJhdGlvbkJlZm9yZUNhbGxiYWNrID0gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVkaXRvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==