﻿/*
 * Copyright 2017 Bimar Bilgi İşlem A.Ş.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//#region Imports
import { BaseModelController } from './basemodelcontroller'
//#endregion
/**
 * Base controller for widgets
 */
abstract class BaseWidgetController<TModel extends IBaseCrudModel> extends BaseModelController<TModel> {
    //#region Props
    /**
     * Widget options
     */
    widget: IWidgetOptions;

    private refreshPromise: ng.IPromise<any>;
    $timeout: ng.ITimeoutService;
    /**
   * Widget controller options
   */
    get widgetPageOptions(): IWidgetPageOptions { return this.options as IWidgetPageOptions; }

    /**
   * Model object
   * @returns {TModel}
   */
    get model(): TModel | IBaseListModel<TModel> | IPagingListModel<TModel> { return this._model as TModel | IBaseListModel<TModel> | IPagingListModel<TModel> }
    set model(value: TModel | IBaseListModel<TModel> | IPagingListModel<TModel>) {
        if (this.isAssigned(value)) {
            this._model = value;
        }
    }

    //#endregion

    //#region Init
    /**
     * Custom injections
     */
    static injects = BaseModelController.injects.concat(['$timeout', 'widget']);

    constructor(bundle: IBundle, options?: IWidgetPageOptions) {
        super(bundle, angular.extend({ initializeModel: true }, options));
        //init model
        if (this.widgetPageOptions.initializeModel) {
            this.initModel();
        }
    }

    destroy(): void {
        super.destroy();

        if (this.refreshPromise) {
            this.$timeout.cancel(this.refreshPromise);
        }
    }
    /**
     * Update bundle
     * @param bundle IBundle
     */
    initBundle(bundle: IBundle): void {
        super.initBundle(bundle);
        this.widget = bundle.systemBundles["widget"];
        this.$timeout = bundle.systemBundles["$timeout"];
    }
    //#endregion

    //#region Methods
    /**
     * Refresh widget
     */
    refreshWidget(): void {
        this.initModel();
    }
    /**
    * @abstract Abstract get model method
    * @param args Optional params
    */
    getModel(modelFilter?: IBaseModelFilter): ng.IPromise<TModel> | TModel | ng.IPromise<IBaseListModel<TModel>> |
        IBaseListModel<TModel> | ng.IPromise<IPagingListModel<TModel>> | IPagingListModel<TModel> {
        return this.common.promise();
    }
    /**
     * Loaded Model
     * @param model Model
     */
    loadedModel(model: TModel | IBaseListModel<TModel> | IPagingListModel<TModel>): void {
        super.loadedModel(model);
        //set refresh interval
        if (this.widget.refreshInterval) {
            //check min refresh interval time
            if (this.widget.refreshInterval < this.constants.dashboard.MIN_WIDGET_REFRESH_INTERVAL) {
                this.widget.refreshInterval = this.constants.dashboard.MIN_WIDGET_REFRESH_INTERVAL;
                this.logger.console.warn({
                    message: `${this.widget.widgetName} widget refresh interval time set to min ${this.widget.refreshInterval}`
                });
            }
            this.refreshPromise = this.$timeout(() => {
                this.refreshWidget();
            }, this.widget.refreshInterval);
        }
    }
    //#endregion
}

export { BaseWidgetController }