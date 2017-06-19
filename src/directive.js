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
        me.editor.on('change', function () { return _this.updateText(); });
        me.editor.on('paste', function () { return _this.updateText(); });
    };
    AceEditorDirective.prototype.updateText = function () {
        var newVal = this.editor.getValue(), that = this;
        if (newVal === this.oldText) {
            return;
        }
        if (typeof this.oldText !== 'undefined') {
            if (!this._durationBeforeCallback) {
                this._text = newVal;
                this.textChange.emit(newVal);
                this.textChanged.emit(newVal);
            }
            else {
                if (this.timeoutSaving != null) {
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
        if (typeof this._mode === 'object') {
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
        if (this._text !== text) {
            if (text === null || text === undefined) {
                text = "";
            }
            if (this._autoUpdateContent === true) {
                this._text = text;
                this.editor.setValue(text);
                this.editor.clearSelection();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBaUUsZUFBZSxDQUFDLENBQUE7QUFDakYsUUFBTyxPQUFPLENBQUMsQ0FBQTtBQUNmLFFBQU8scUJBQXFCLENBQUMsQ0FBQTtBQUM3QixRQUFPLGlCQUFpQixDQUFDLENBQUE7QUFPekI7SUFjSSw0QkFBWSxVQUFzQjtRQWJ4QixnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2pDLGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUMxQyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixVQUFLLEdBQVEsTUFBTSxDQUFDO1FBQ3BCLHVCQUFrQixHQUFZLElBQUksQ0FBQztRQUNuQyw0QkFBdUIsR0FBVyxDQUFDLENBQUM7UUFDcEMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQU1mLElBQUksRUFBRSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFOUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxpQ0FBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFhLElBQUksQ0FBQyxNQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELHVDQUFVLEdBQVY7UUFBQSxpQkFLQztRQUpHLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUVkLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7UUFDaEQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsdUNBQVUsR0FBVjtRQUNJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqRCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM3QixZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO2dCQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO29CQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDOUIsQ0FBQyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVRLHNCQUFJLHVDQUFPO2FBQVgsVUFBWSxPQUFZO1lBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUVRLHNCQUFJLHdDQUFRO2FBQVosVUFBYSxRQUFhO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBRVEsc0JBQUkscUNBQUs7YUFBVCxVQUFVLEtBQVU7WUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBYSxLQUFPLENBQUMsQ0FBQztRQUMvQyxDQUFDOzs7T0FBQTtJQUVRLHNCQUFJLG9DQUFJO2FBQVIsVUFBUyxJQUFTO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxvQ0FBTyxHQUFQLFVBQVEsSUFBUztRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFZLElBQUksQ0FBQyxLQUFPLENBQUMsQ0FBQztRQUMvRCxDQUFDO0lBQ0wsQ0FBQztJQUdELHNCQUFJLG9DQUFJO2FBQVI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBQ0QsVUFBUyxJQUFZO1lBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQzs7O09BSEE7SUFLRCxvQ0FBTyxHQUFQLFVBQVEsSUFBUztRQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDakMsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRVEsc0JBQUksaURBQWlCO2FBQXJCLFVBQXNCLE1BQVc7WUFDdEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVRLHNCQUFJLHNEQUFzQjthQUExQixVQUEyQixHQUFXO1lBQzNDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUVELHNEQUF5QixHQUF6QixVQUEwQixHQUFXO1FBQ2pDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxHQUFHLENBQUM7SUFDdkMsQ0FBQztJQUVELHNCQUFJLHlDQUFTO2FBQWI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQTdIRDtRQUFDLGFBQU0sRUFBRTs7MkRBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7MERBQUE7SUE0RFQ7UUFBQyxZQUFLLEVBQUU7OztxREFBQTtJQUtSO1FBQUMsWUFBSyxFQUFFOzs7c0RBQUE7SUFLUjtRQUFDLFlBQUssRUFBRTs7O21EQUFBO0lBS1I7UUFBQyxZQUFLLEVBQUU7OztrREFBQTtJQWFSO1FBQUMsWUFBSyxFQUFFOztrREFBQTtJQXNCUjtRQUFDLFlBQUssRUFBRTs7OytEQUFBO0lBSVI7UUFBQyxZQUFLLEVBQUU7OztvRUFBQTtJQXZIWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztTQUMzQixDQUFDOzswQkFBQTtJQWdJRix5QkFBQztBQUFELENBQUMsQUEvSEQsSUErSEM7QUEvSFksMEJBQWtCLHFCQStIOUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgJ2JyYWNlJztcclxuaW1wb3J0ICdicmFjZS90aGVtZS9tb25va2FpJztcclxuaW1wb3J0ICdicmFjZS9tb2RlL2h0bWwnO1xyXG5cclxuZGVjbGFyZSB2YXIgYWNlOiBhbnk7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2FjZS1lZGl0b3JdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQWNlRWRpdG9yRGlyZWN0aXZlIHtcclxuICAgIEBPdXRwdXQoKSB0ZXh0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSB0ZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgX29wdGlvbnM6IGFueSA9IHt9O1xyXG4gICAgX3JlYWRPbmx5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfdGhlbWU6IHN0cmluZyA9IFwibW9ub2thaVwiO1xyXG4gICAgX21vZGU6IGFueSA9IFwiaHRtbFwiO1xyXG4gICAgX2F1dG9VcGRhdGVDb250ZW50OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIF9kdXJhdGlvbkJlZm9yZUNhbGxiYWNrOiBudW1iZXIgPSAwO1xyXG4gICAgX3RleHQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBlZGl0b3I6IGFueTtcclxuICAgIG9sZFRleHQ6IGFueTtcclxuICAgIHRpbWVvdXRTYXZpbmc6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuZWRpdG9yID0gYWNlW1wiZWRpdFwiXShlbCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9ucyh0aGlzLl9vcHRpb25zIHx8IHt9KTtcclxuICAgICAgICB0aGlzLmVkaXRvci5zZXRUaGVtZShgYWNlL3RoZW1lLyR7dGhpcy5fdGhlbWV9YCk7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlKHRoaXMuX21vZGUpO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldFJlYWRPbmx5KHRoaXMuX3JlYWRPbmx5KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0RXZlbnRzKCkge1xyXG4gICAgICAgIGxldCBtZSA9IHRoaXM7XHJcblxyXG4gICAgICAgIG1lLmVkaXRvci5vbignY2hhbmdlJywgKCkgPT4gdGhpcy51cGRhdGVUZXh0KCkpO1xyXG4gICAgICAgIG1lLmVkaXRvci5vbigncGFzdGUnLCAoKSA9PiB0aGlzLnVwZGF0ZVRleHQoKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZVRleHQoKSB7XHJcbiAgICAgICAgbGV0IG5ld1ZhbCA9IHRoaXMuZWRpdG9yLmdldFZhbHVlKCksIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGlmIChuZXdWYWwgPT09IHRoaXMub2xkVGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vbGRUZXh0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2R1cmF0aW9uQmVmb3JlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RleHQgPSBuZXdWYWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDaGFuZ2UuZW1pdChuZXdWYWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q2hhbmdlZC5lbWl0KG5ld1ZhbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lb3V0U2F2aW5nICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0U2F2aW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRTYXZpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90ZXh0ID0gbmV3VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudGV4dENoYW5nZS5lbWl0KG5ld1ZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50ZXh0Q2hhbmdlZC5lbWl0KG5ld1ZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50aW1lb3V0U2F2aW5nID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMuX2R1cmF0aW9uQmVmb3JlQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub2xkVGV4dCA9IG5ld1ZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLmVkaXRvci5zZXRPcHRpb25zKG9wdGlvbnMgfHwge30pO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCByZWFkT25seShyZWFkT25seTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fcmVhZE9ubHkgPSByZWFkT25seTtcclxuICAgICAgICB0aGlzLmVkaXRvci5zZXRSZWFkT25seShyZWFkT25seSk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IHRoZW1lKHRoZW1lOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl90aGVtZSA9IHRoZW1lO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldFRoZW1lKGBhY2UvdGhlbWUvJHt0aGVtZX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgbW9kZShtb2RlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNldE1vZGUobW9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kZShtb2RlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX21vZGUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKHRoaXMuX21vZGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKGBhY2UvbW9kZS8ke3RoaXMuX21vZGV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgdGV4dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcclxuICAgIH1cclxuICAgIHNldCB0ZXh0KHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2V0VGV4dCh0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUZXh0KHRleHQ6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLl90ZXh0ICE9PSB0ZXh0KSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0ID09PSBudWxsIHx8IHRleHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hdXRvVXBkYXRlQ29udGVudCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dCA9IHRleHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5zZXRWYWx1ZSh0ZXh0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IGF1dG9VcGRhdGVDb250ZW50KHN0YXR1czogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fYXV0b1VwZGF0ZUNvbnRlbnQgPSBzdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IGR1cmF0aW9uQmVmb3JlQ2FsbGJhY2sobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNldER1cmF0aW9uQmVmb3JlQ2FsbGJhY2sobnVtKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREdXJhdGlvbkJlZm9yZUNhbGxiYWNrKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZHVyYXRpb25CZWZvcmVDYWxsYmFjayA9IG51bTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWNlRWRpdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvcjtcclxuICAgIH1cclxufVxyXG4iXX0=