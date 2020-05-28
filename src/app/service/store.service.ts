import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
import * as CDSSPlugin from 'capacitor-data-storage-sqlite';
const { CapacitorDataStorageSqlite, Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  store: any;
  isService = false;
  platform: string;

  constructor() { }

  async init(): Promise<void> {
    const info = await Device.getInfo();
    this.platform = info.platform;
    if (this.platform === 'ios' || this.platform === 'android') {
      this.store = CapacitorDataStorageSqlite;
    } else if (this.platform === 'electron') {
      this.store = CDSSPlugin.CapacitorDataStorageSqliteElectron;
    } else {
      this.store = CDSSPlugin.CapacitorDataStorageSqlite;
    }
    this.isService = true;
  }

  async openStore(database?: string, table?: string, encrypted?: boolean, mode?: string): Promise<boolean> {
    if (this.isService) {
      const db: string = database ? database : 'storage';
      const tbl: string = table ? table : 'storage_table';
      const enc: boolean = encrypted ? encrypted : false;
      const option: string = mode ? mode : 'no-encryption';
      const {result} = await this.store.openStore({db, tbl, enc, option});
      return result;
    } else {
      return Promise.resolve(false);
    }
  }

  async setTable(table: string): Promise<any> {
    if (this.isService) {
      const {result, message} = await this.store.setTable({table});
      return Promise.resolve([result, message]);
    } else {
      return Promise.resolve({result: false, message: 'Service is not initialized'});
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    if (this.isService && key.length > 0) {
      await this.store.set({ key, value });
    }
  }

  async getItem(key: string): Promise<string> {
    if (this.isService && key.length > 0) {
      const {value} = await this.store.get({ key });
      // console.log('in getItem value ', value);
      return value;
    } else {
      return null;
    }
  }

  async removeItem(key: string): Promise<boolean> {
    if (this.isService && key.length > 0) {
      const {result} = await this.store.remove({ key });
      return result;
    } else {
      return null;
    }
  }

  async getAllKeys(): Promise<Array<string>> {
    if (this.isService ) {
      const {keys} = await this.store.keys();
      return keys;
    } else {
      return null;
    }
  }

  async getAllValues(): Promise<Array<string>> {
    if (this.isService ) {
      const {values} = await this.store.values();
      return values;
    } else {
      return null;
    }
  }

  async getAllKeysValues(): Promise<Array<any>> {
    if (this.isService ) {
      const {keysvalues} = await this.store.keysvalues();
      return keysvalues;
    } else {
      return null;
    }
  }
}
