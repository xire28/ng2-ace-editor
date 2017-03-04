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
        this.textChange = new core_1.EventEmitter();
        this._options = {};
        this._readOnly = false;
        this._theme = "monokai";
        this._mode = "html";
        this._autoUpdateContent = true;
        this._durationBeforeCallback = 0;
        this._text = "";
        var el = elementRef.nativeElement;
        this.editor = ace["edit"](el);
        this.init();
        this.initEvents();
    }
    AceEditorDirective.prototype.init = function () {
        this.editor.setOptions(this._options || {});
        this.editor.setTheme("ace/theme/" + this._theme);
        this.setMode(this._mode);
        this.editor.setReadOnly(this._readOnly);
    };
    AceEditorDirective.prototype.initEvents = function () {
        var _this = this;
        var me = this;
        me.editor.on('change', function () {
            var newVal = _this.editor.getValue();
            if (newVal === _this.oldText)
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
            this.setMode(mode);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorDirective.prototype.setMode = function (mode) {
        this._mode = mode;
        if (typeof this._mode == 'object') {
            this.editor.getSession().setMode(this._mode);
        }
        else {
            this.editor.getSession().setMode("ace/mode/" + this._mode);
        }
    };
    Object.defineProperty(AceEditorDirective.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this.setText(text);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorDirective.prototype.setText = function (text) {
        if (this._text != text) {
            if (text == null)
                text = "";
            if (this._autoUpdateContent == true) {
                this._text = text;
                this.editor.setValue(text);
            }
        }
    };
    Object.defineProperty(AceEditorDirective.prototype, "autoUpdateContent", {
        set: function (status) {
            this._autoUpdateContent = status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AceEditorDirective.prototype, "durationBeforeCallback", {
        set: function (num) {
            this.setDurationBeforeCallback(num);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorDirective.prototype.setDurationBeforeCallback = function (num) {
        this._durationBeforeCallback = num;
    };
    Object.defineProperty(AceEditorDirective.prototype, "aceEditor", {
        get: function () {
            return this.editor;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AceEditorDirective.prototype, "textChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AceEditorDirective.prototype, "textChange", void 0);
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
        __metadata('design:type', Object)
    ], AceEditorDirective.prototype, "text", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "autoUpdateContent", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], AceEditorDirective.prototype, "durationBeforeCallback", null);
    AceEditorDirective = __decorate([
        core_1.Directive({
            selector: '[ace-editor]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AceEditorDirective);
    return AceEditorDirective;
}());
exports.AceEditorDirective = AceEditorDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBaUUsZUFBZSxDQUFDLENBQUE7QUFDakYsUUFBTyxPQUFPLENBQUMsQ0FBQTtBQUNmLFFBQU8scUJBQXFCLENBQUMsQ0FBQTtBQUM3QixRQUFPLGlCQUFpQixDQUFDLENBQUE7QUFPekI7SUFjSSw0QkFBWSxVQUFzQjtRQWJ4QixnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2pDLGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUMxQyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixVQUFLLEdBQVEsTUFBTSxDQUFDO1FBQ3BCLHVCQUFrQixHQUFZLElBQUksQ0FBQztRQUNuQyw0QkFBdUIsR0FBVyxDQUFDLENBQUM7UUFDcEMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQU1mLElBQUksRUFBRSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFOUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxpQ0FBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFhLElBQUksQ0FBQyxNQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMs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RDtRQUFDLGFBQU0sRUFBRTs7MkRBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7MERBQUE7SUFzRFQ7UUFBQyxZQUFLLEVBQUU7OztxREFBQTtJQUtSO1FBQUMsWUFBSyxFQUFFOzs7c0RBQUE7SUFLUjtRQUFDLFlBQUssRUFBRTs7O21EQUFBO0lBS1I7UUFBQyxZQUFLLEVBQUU7OztrREFBQTtJQWNSO1FBQUMsWUFBSyxFQUFFOztrREFBQTtJQW9CUjtRQUFDLFlBQUssRUFBRTs7OytEQUFBO0lBSVI7UUFBQyxZQUFLLEVBQUU7OztvRUFBQTtJQWhIWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztTQUMzQixDQUFDOzswQkFBQTtJQXlIRix5QkFBQztBQUFELENBQUMsQUF4SEQsSUF3SEM7QUF4SFksMEJBQWtCLHFCQXdIOUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICdicmFjZSc7XG5pbXBvcnQgJ2JyYWNlL3RoZW1lL21vbm9rYWknO1xuaW1wb3J0ICdicmFjZS9tb2RlL2h0bWwnO1xuXG5kZWNsYXJlIHZhciBhY2U6IGFueTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbYWNlLWVkaXRvcl0nXG59KVxuZXhwb3J0IGNsYXNzIEFjZUVkaXRvckRpcmVjdGl2ZSB7XG4gICAgQE91dHB1dCgpIHRleHRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSB0ZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIF9vcHRpb25zOiBhbnkgPSB7fTtcbiAgICBfcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBfdGhlbWU6IHN0cmluZyA9IFwibW9ub2thaVwiO1xuICAgIF9tb2RlOiBhbnkgPSBcImh0bWxcIjtcbiAgICBfYXV0b1VwZGF0ZUNvbnRlbnQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIF9kdXJhdGlvbkJlZm9yZUNhbGxiYWNrOiBudW1iZXIgPSAwO1xuICAgIF90ZXh0OiBzdHJpbmcgPSBcIlwiO1xuICAgIGVkaXRvcjogYW55O1xuICAgIG9sZFRleHQ6IGFueTtcbiAgICB0aW1lb3V0U2F2aW5nOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIGxldCBlbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBhY2VbXCJlZGl0XCJdKGVsKTtcblxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9ucyh0aGlzLl9vcHRpb25zIHx8IHt9KTtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0VGhlbWUoYGFjZS90aGVtZS8ke3RoaXMuX3RoZW1lfWApO1xuICAgICAgICB0aGlzLnNldE1vZGUodGhpcy5fbW9kZSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLnNldFJlYWRPbmx5KHRoaXMuX3JlYWRPbmx5KTtcbiAgICB9XG5cbiAgICBpbml0RXZlbnRzKCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLmVkaXRvci5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5ld1ZhbCA9IHRoaXMuZWRpdG9yLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBpZiAobmV3VmFsID09PSB0aGlzLm9sZFRleHQpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWUub2xkVGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAobWUuX2R1cmF0aW9uQmVmb3JlQ2FsbGJhY2sgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBtZS5fdGV4dCA9IG5ld1ZhbDtcbiAgICAgICAgICAgICAgICAgICAgbWUudGV4dENoYW5nZS5lbWl0KG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgIG1lLnRleHRDaGFuZ2VkLmVtaXQobmV3VmFsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWUudGltZW91dFNhdmluZyAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KG1lLnRpbWVvdXRTYXZpbmcpO1xuXG4gICAgICAgICAgICAgICAgICAgIG1lLnRpbWVvdXRTYXZpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLl90ZXh0ID0gbmV3VmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWUudGV4dENoYW5nZS5lbWl0KG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZS50ZXh0Q2hhbmdlZC5lbWl0KG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZS50aW1lb3V0U2F2aW5nID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfSwgbWUuX2R1cmF0aW9uQmVmb3JlQ2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub2xkVGV4dCA9IG5ld1ZhbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IG9wdGlvbnMob3B0aW9uczogYW55KSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLmVkaXRvci5zZXRPcHRpb25zKG9wdGlvbnMgfHwge30pO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCByZWFkT25seShyZWFkT25seTogYW55KSB7XG4gICAgICAgIHRoaXMuX3JlYWRPbmx5ID0gcmVhZE9ubHk7XG4gICAgICAgIHRoaXMuZWRpdG9yLnNldFJlYWRPbmx5KHJlYWRPbmx5KTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBzZXQgdGhlbWUodGhlbWU6IGFueSkge1xuICAgICAgICB0aGlzLl90aGVtZSA9IHRoZW1lO1xuICAgICAgICB0aGlzLmVkaXRvci5zZXRUaGVtZShgYWNlL3RoZW1lLyR7dGhlbWV9YCk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IG1vZGUobW9kZTogYW55KSB7XG4gICAgICAgIHRoaXMuc2V0TW9kZShtb2RlKTtcbiAgICB9XG5cbiAgICBzZXRNb2RlKG1vZGU6IGFueSkge1xuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9tb2RlID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZSh0aGlzLl9tb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKGBhY2UvbW9kZS8ke3RoaXMuX21vZGV9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB0ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICB9XG4gICAgc2V0IHRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0VGV4dCh0ZXh0KTtcbiAgICB9XG5cbiAgICBzZXRUZXh0KHRleHQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5fdGV4dCAhPSB0ZXh0KSB7XG4gICAgICAgICAgICBpZiAodGV4dCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRleHQgPSBcIlwiO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fYXV0b1VwZGF0ZUNvbnRlbnQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNldFZhbHVlKHRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IGF1dG9VcGRhdGVDb250ZW50KHN0YXR1czogYW55KSB7XG4gICAgICAgIHRoaXMuX2F1dG9VcGRhdGVDb250ZW50ID0gc3RhdHVzO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBkdXJhdGlvbkJlZm9yZUNhbGxiYWNrKG51bTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0RHVyYXRpb25CZWZvcmVDYWxsYmFjayhudW0pO1xuICAgIH1cblxuICAgIHNldER1cmF0aW9uQmVmb3JlQ2FsbGJhY2sobnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZHVyYXRpb25CZWZvcmVDYWxsYmFjayA9IG51bTtcbiAgICB9XG5cbiAgICBnZXQgYWNlRWRpdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3I7XG4gICAgfVxufVxuIl19