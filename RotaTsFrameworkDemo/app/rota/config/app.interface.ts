﻿//import { BaseController } from '../base/basecontroller';
import { InjectableObject } from '../base/injectableobject';
import { BaseApi } from '../base/baseapi';

/**
 * Application interface
 */
export interface IRotaApp {
    /**
     * Error event handler
     * @param error Error
     */
    onError?(errCallBack: Function | any[]): void;
    /**
     * Company changed event
     * @param company Selected company     
     */
    onCompanyChanged?(callBack: Function | any[]): void ;
    /**
     * Rota module
     */
    rotaModule: ng.IModule;
    /**
    * Set injector for further module dependecy
    * @param $injector
    */
    setInjector($injector: ng.auto.IInjectorService): void;
    /**
    * Add controller with dependencies
    * @param controllerName Controller name
    * @param controller Controller instance
    * @param dependencies Dependencies 
    */
    addController(controllerName: string, controller: typeof InjectableObject, ...dependencies: string[]): IRotaApp;
    /**
    * Register directive
    * @param directiveName Directive Name
    * @param directiveFactory Directive function
    */
    addDirective(directiveName: string, directiveFactory: Function | any[]): IRotaApp;
    /**
    * Register filter
    * @param filterName Filter Name
    * @param filterFactory Filter factory
    */
    addFilter(filterName: string, filterFactory: Function | any[]): IRotaApp;
    /**
     * Add service api with dependencies
     * @param apiName Api name
     * @param api Api class itself
     * @param dependencies Optional dependencies
     */
    addApi(apiName: string, api: typeof BaseApi, ...dependencies: string[]): IRotaApp;
    /**
     * Add value provider service
     * @param serviceName Value service name
     * @param service Service itself
     */
    addValue<TModel extends IBaseModel>(serviceName: string, service: TModel): IRotaApp;
    /**
    * Add module after app bootstrap
    * @param modules Modules to load
    */
    addModule(...modules: string[]): IRotaApp;
    /**
     * Configure app method
     * @param fn Function to register
     * @returns {IRotaApp} 
     */
    configure(fn: Function): IRotaApp;
    /**
     * Configure app method
     * @param fn Function to register
     * @returns {IRotaApp} 
     */
    configure(fn: any[]): IRotaApp;
    /**
     * Register run phase function
     * @param fn Function to register
     * @returns {IRotaApp} 
     */
    run(fn: Function): IRotaApp;
    /**
     * Register run phase function
     * @param fn Function to register
     * @returns {IRotaApp} 
     */
    run(fn: any[]): IRotaApp;
    /**
     * Define a state rule providing the url
     * @description When from url is requested,go to url defined in to param
     * @param redirections List of reddirections including from and to paths
     * @example App.redirect([
    {
        from: "bkg/new",
        to: "bkg/new/genelbilgiler"
    }]);
     */
    redirect(redirections: { from: string, to: string }[]): IRotaApp;
    /**
     * Sets home page settings
     * @param options Options
     * @returns {IRotaApp}
     */
    setHomePage(options: IHomePageOptions): IRotaApp;
}
