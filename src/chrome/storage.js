/* @flow */
/**
 * This file is part of the TREZOR project.
 *
 * Copyright (C) 2015 SatoshiLabs <info@satoshilabs.com>
 *
 * This library is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library.  If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * Chrome's extension storage is actually more complicated
 * than LocalStorage, because it uses callbacks =>
 * I am converting them to (IMO) more manageable Promises
 */

'use strict';


/**
 * Get from storage
 * @param {String} key
 * @returns {Promise.<Object>} Thing from the storage, or null
 */
export function get(key: string): Promise<any> {
  return new Promise(function (resolve, reject) {
    try {
      chrome.storage.local.get(key, function (items) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          if (items[key] === null || items[key] === undefined) {
            resolve(null);
          } else {
            resolve(items[key]);
          }
          resolve(items);
        }
      })
    } catch (e) {
      reject(e);
    }
  })
}

/**
 * Set to storage
 * @param {String} key
 * @param {Object} value Thing to save to the storage
 */
module.exports.set = function (key:string, value:any): Promise<void> {
  return new Promise(function (resolve, reject) {
    try {
      var obj: {} = {};
      obj[key] = value;
      chrome.storage.local.set(obj, function () {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(undefined);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}
