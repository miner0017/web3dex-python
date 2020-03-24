!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("react-admin"),require("path-browserify"),require("firebase/app"),require("firebase/firestore"),require("firebase/auth"),require("firebase/storage")):"function"==typeof define&&define.amd?define(["exports","react-admin","path-browserify","firebase/app","firebase/firestore","firebase/auth","firebase/storage"],r):r(e.reactAdminFirebase={},e.reactAdmin,e.path,e.firebase)}(this,function(e,r,t,n){function o(e,r){a&&console.log("react-admin-firebase: ",e,r)}function i(e,r){a&&console.error("react-admin-firebase: ",e,r)}t=t&&t.hasOwnProperty("default")?t.default:t;var a=!1;function s(e,r){(e&&e.debug||r.logging)&&(a=!0)}function u(e,r){try{var t=e()}catch(e){return r(e)}return t&&t.then?t.then(void 0,r):t}function c(e,r){if(!e)return r;if(!r)throw new Error("Resource name must be a string of length greater than 0 characters");var n=t.join("/",e,"/",r,"/");if((n.split("/").length-1)%2)throw new Error('The rootRef path must point to a "document" not a "collection"\ne.g. /collection/document/ or /collection/document/collection/document/');return n.slice(1,-1)}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var l=function(e,r){this.fireWrapper=e,this.options=r,this.resources={},this.db=e.db()};function p(e,r,t){e.sort(function(e,n){var o,i,a=e[r],s=n[r];return Number.isFinite(a)&&Number.isFinite(s)?(o=a,i=s):(o=(e[r]||"").toString().toLowerCase(),i=(n[r]||"").toString().toLowerCase()),o>i?"asc"===t?1:-1:o<i?"asc"===t?-1:1:0})}l.prototype.GetResource=function(e){var r=this.resources[e];if(!r)throw new Error('react-admin-firebase: Cant find resource: "'+e+'"');return r},l.prototype.TryGetResourcePromise=function(e,r){try{var t=this;return o("resourceManager.TryGetResourcePromise",{relativePath:e,collectionQuery:r}),Promise.resolve(t.initPath(e,r)).then(function(){var r=t.resources[e];if(!r)throw new Error('react-admin-firebase: Cant find resource: "'+e+'"');return r})}catch(e){return Promise.reject(e)}},l.prototype.RefreshResource=function(e,r){try{var t=this;return o("resourceManager.RefreshResource",{relativePath:e,collectionQuery:r}),Promise.resolve(t.initPath(e,r)).then(function(){var n=t.resources[e],o=t.applyQuery(n.collection,r);return Promise.resolve(o.get()).then(function(e){n.list=e.docs.map(function(e){return t.parseFireStoreDocument(e)})})})}catch(e){return Promise.reject(e)}},l.prototype.GetSingleDoc=function(e,r){try{var t=this;return Promise.resolve(t.initPath(e)).then(function(){return Promise.resolve(t.resources[e].collection.doc(r).get()).then(function(e){if(!e.exists)throw new Error("react-admin-firebase: No id found matching: "+r);return t.parseFireStoreDocument(e)})})}catch(e){return Promise.reject(e)}},l.prototype.initPath=function(e,r){try{var t=this,n=c(t.options.rootRef,e);return o("resourceManager.initPath:::",{absolutePath:n}),Promise.resolve(t.isCollectionAccessible(n,r)).then(function(r){var i=!!t.resources[e];if(o("resourceManager.initPath:::",{absolutePath:n,isAccessible:r,hasBeenInited:i}),r||!i){if(!i){var a=t.db.collection(n);t.resources[e]={collection:a,list:[],path:e,pathAbsolute:n}}}else t.removeResource(e)})}catch(e){return Promise.reject(e)}},l.prototype.parseFireStoreDocument=function(e){var r=e.data();return Object.keys(r).forEach(function(e){var t=r[e];t&&t.toDate&&t.toDate instanceof Function&&(r[e]=t.toDate())}),Object.assign({},{id:e.id},r)},l.prototype.getUserLogin=function(){try{var e=this;return new Promise(function(r,t){e.fireWrapper.auth().onAuthStateChanged(function(e){r(e)})})}catch(e){return Promise.reject(e)}},l.prototype.isCollectionAccessible=function(e,r){try{var t=!1,n=this,o=u(function(){var t=n.db.collection(e),o=n.applyQuery(t,r);return Promise.resolve(o.limit(1).get()).then(function(){})},function(){return t=!0,!1});return o&&o.then?o.then(function(e){return!t||e}):!t||o}catch(e){return Promise.reject(e)}},l.prototype.removeResource=function(e){delete this.resources[e]},l.prototype.applyQuery=function(e,r){return r?r(e):e};var f=function(e,r){this.fireWrapper=e,this.options=r,this.db=e.db(),this.rm=new l(this.fireWrapper,this.options)};f.prototype.apiGetList=function(e,r){try{o("apiGetList",{resourceName:e,params:r});var t=r.filter.collectionQuery;return delete r.filter.collectionQuery,Promise.resolve(this.tryGetResource(e,"REFRESH",t)).then(function(e){var t=e.list;if(null!=r.sort){var n=r.sort;p(t,n.field,"ASC"===n.order?"asc":"desc")}var o=function(e,r){if(!(t=r)||"{}"===JSON.stringify(t))return e;var t,n=Object.keys(r);return e.filter(function(e){return n.reduce(function(t,n){var o=r[n];null!=o&&null!=o||(o="");var i=o.toString().toLowerCase(),a=e[n];if(null==a)return!1;var s=a.toString().toLowerCase().includes(i);return t||s},!1)})}(t,r.filter),i=(r.pagination.page-1)*r.pagination.perPage;return{data:o.slice(i,i+r.pagination.perPage),total:e.list.length}})}catch(e){return Promise.reject(e)}},f.prototype.apiGetOne=function(e,r){try{var t=this;return o("apiGetOne",{resourceName:e,params:r}),u(function(){return Promise.resolve(t.rm.GetSingleDoc(e,r.id)).then(function(e){return{data:e}})},function(){throw new Error("Error getting id: "+r.id+" from collection: "+e)})}catch(e){return Promise.reject(e)}},f.prototype.apiCreate=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){return o("apiCreate",{resourceName:e,resource:n,params:r}),Promise.resolve(t.getCurrentUserEmail()).then(function(e){var o=!1;function i(i){if(o)return i;var a=t.db.collection("collections").doc().id;return Promise.resolve(t.parseDataAndUpload(n,a,r.data)).then(function(r){var o=Object.assign({},r,{createdate:t.fireWrapper.serverTimestamp(),lastupdate:t.fireWrapper.serverTimestamp(),createdby:e,updatedby:e});return Promise.resolve(n.collection.doc(a).set(o,{merge:!1})).then(function(){return{data:Object.assign({},r,{id:a})}})})}var a=r.data&&r.data.id,s=function(){if(a){var i=r.data.id;return Promise.resolve(t.parseDataAndUpload(n,i,r.data)).then(function(r){if(!i)throw new Error("id must be a valid string");var a=Object.assign({},r,{createdate:t.fireWrapper.serverTimestamp(),lastupdate:t.fireWrapper.serverTimestamp(),createdby:e,updatedby:e});return Promise.resolve(n.collection.doc(i).set(a,{merge:!0})).then(function(){return o=!0,{data:Object.assign({},r,{id:i})}})})}}();return s&&s.then?s.then(i):i(s)})})}catch(e){return Promise.reject(e)}},f.prototype.apiUpdate=function(e,r){try{var t=this,n=r.id;return delete r.data.id,Promise.resolve(t.tryGetResource(e)).then(function(a){return o("apiUpdate",{resourceName:e,resource:a,params:r}),Promise.resolve(t.getCurrentUserEmail()).then(function(e){return Promise.resolve(t.parseDataAndUpload(a,n,r.data)).then(function(r){return a.collection.doc(n).update(Object.assign({},r,{lastupdate:t.fireWrapper.serverTimestamp(),updatedby:e})).catch(function(e){i("apiUpdate error",{error:e})}),{data:Object.assign({},r,{id:n})}})})})}catch(e){return Promise.reject(e)}},f.prototype.apiUpdateMany=function(e,r){try{var t=this;return delete r.data.id,Promise.resolve(t.tryGetResource(e)).then(function(n){o("apiUpdateMany",{resourceName:e,resource:n,params:r});var a=r.ids;return Promise.resolve(t.getCurrentUserEmail()).then(function(e){return Promise.resolve(Promise.all(a.map(function(o){try{return Promise.resolve(t.parseDataAndUpload(n,o,r.data)).then(function(r){return n.collection.doc(o).update(Object.assign({},r,{lastupdate:t.fireWrapper.serverTimestamp(),updatedby:e})).catch(function(e){i("apiUpdateMany error",{error:e})}),Object.assign({},r,{id:o})})}catch(e){return Promise.reject(e)}}))).then(function(e){return{data:e}})})})}catch(e){return Promise.reject(e)}},f.prototype.apiDelete=function(e,r){try{return Promise.resolve(this.tryGetResource(e)).then(function(t){return o("apiDelete",{resourceName:e,resource:t,params:r}),t.collection.doc(r.id).delete().catch(function(e){i("apiDelete error",{error:e})}),{data:r.previousData}})}catch(e){return Promise.reject(e)}},f.prototype.apiDeleteMany=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){o("apiDeleteMany",{resourceName:e,resource:n,params:r});for(var a=[],s=t.db.batch(),u=0,c=r.ids;u<c.length;u+=1){var l=c[u];s.delete(n.collection.doc(l)),a.push({id:l})}return s.commit().catch(function(e){i("apiDeleteMany error",{error:e})}),{data:a}})}catch(e){return Promise.reject(e)}},f.prototype.apiGetMany=function(e,r){try{return Promise.resolve(this.tryGetResource(e,"REFRESH")).then(function(t){return o("apiGetMany",{resourceName:e,resource:t,params:r}),Promise.resolve(Promise.all(r.ids.map(function(e){return t.collection.doc(e).get()}))).then(function(e){return{data:e.map(function(e){return Object.assign({},e.data(),{id:e.id})})}})})}catch(e){return Promise.reject(e)}},f.prototype.apiGetManyReference=function(e,r){try{return Promise.resolve(this.tryGetResource(e,"REFRESH")).then(function(t){o("apiGetManyReference",{resourceName:e,resource:t,params:r});var n=t.list,i=r.target,a=r.id,s=n.filter(function(e){return e[i]===a});if(null!=r.sort){var u=r.sort;p(n,u.field,"ASC"===u.order?"asc":"desc")}var c=(r.pagination.page-1)*r.pagination.perPage;return{data:s.slice(c,c+r.pagination.perPage),total:s.length}})}catch(e){return Promise.reject(e)}},f.prototype.tryGetResource=function(e,r,t){try{var n=this;function o(){return n.rm.TryGetResourcePromise(e,t)}var i=function(){if(r)return Promise.resolve(n.rm.RefreshResource(e,t)).then(function(){})}();return i&&i.then?i.then(o):o()}catch(e){return Promise.reject(e)}},f.prototype.getCurrentUserEmail=function(){try{return Promise.resolve(this.rm.getUserLogin()).then(function(e){return e?e.email:"annonymous user"})}catch(e){return Promise.reject(e)}},f.prototype.parseDataAndUpload=function(e,r,t,n,o){try{var i=this;if(!t)return t;var a=n||e.collection.doc(r).path;return Promise.resolve(Promise.all(Object.keys(t).map(function(n){try{function s(){return u&&"object"==typeof u&&!u.hasOwnProperty("rawFile")?i.parseDataAndUpload(e,r,u,a,n):(o&&(a+="/"+o),Promise.resolve(i.parseDataField(u,a,n)).then(function(){}))}var u=t[n],c=Array.isArray(u),l=function(){if(c)return Promise.resolve(Promise.all(u.map(function(t,o){return u[o]&&u[o].hasOwnProperty("rawFile")?Promise.all([i.parseDataField(u[o],a,n+o)]):Promise.all(Object.keys(t).map(function(s){var u=t[s];return u&&"object"==typeof u&&!u.hasOwnProperty("rawFile")?i.parseDataAndUpload(e,r,u,a+="/"+o+"/"+n):i.parseDataField(u,a,"/"+n+"/"+o+"/"+s)}))}))).then(function(){})}();return Promise.resolve(l&&l.then?l.then(s):s())}catch(e){return Promise.reject(e)}}))).then(function(){return t})}catch(e){return Promise.reject(e)}},f.prototype.parseDataField=function(e,r,t){try{if(!e||!e.hasOwnProperty("rawFile"))return;var n=Object.keys(e).find(function(e){return"rawFile"!==e&&"title"!==e});return Promise.resolve(this.uploadAndGetLink(e.rawFile,r,t)).then(function(r){e[n]=r,delete e.rawFile})}catch(e){return Promise.reject(e)}},f.prototype.uploadAndGetLink=function(e,r,n){try{var o=t.join(r,n);return Promise.resolve(this.saveFile(o,e))}catch(e){return Promise.reject(e)}},f.prototype.saveFile=function(e,r){try{o("saveFile() saving file...",{storagePath:e,rawFile:r});var t=this.fireWrapper.storage().ref(e).put(r);return u(function(){return Promise.resolve(new Promise(function(e,r){return t.then(e).catch(r)})).then(function(r){return Promise.resolve(r.ref.getDownloadURL()).then(function(t){return o("saveFile() saved file",{storagePath:e,taskResult:r,getDownloadURL:t}),t})})},function(e){i("storage/unknown"===e.code?'saveFile() error saving file, No bucket found! Try clicking "Get Started" in firebase -> storage':"saveFile() error saving file",{storageError:e})})}catch(e){return Promise.reject(e)}};var h,d=function(){};d.prototype.init=function(e,r){this.app=function(e,r){return r.app?r.app:n.apps.length?n.app():n.initializeApp(e)}(e,r),this.firestore=this.app.firestore()},d.prototype.db=function(){return this.firestore},d.prototype.serverTimestamp=function(){return n.firestore.FieldValue.serverTimestamp()},d.prototype.auth=function(){return this.app.auth()},d.prototype.storage=function(){return this.app.storage()};var m=function(e,r){var t=r||{};o("Auth Client: initializing...",{firebaseConfig:e,options:t});var n=new d;n.init(e,t),this.auth=n.auth()};m.prototype.HandleAuthLogin=function(e){try{var r=this,t=e.username,n=e.password;return t&&n?u(function(){return Promise.resolve(r.auth.signInWithEmailAndPassword(t,n)).then(function(e){return o("HandleAuthLogin: user sucessfully logged in",{user:e}),e})},function(){throw o("HandleAuthLogin: invalid credentials",{params:e}),new Error("Login error: invalid credentials")}):r.getUserLogin()}catch(e){return Promise.reject(e)}},m.prototype.HandleAuthLogout=function(){return this.auth.signOut()},m.prototype.HandleAuthError=function(e){return o("HandleAuthLogin: invalid credentials",{error:e}),Promise.reject("Login error: invalid credentials")},m.prototype.HandleAuthCheck=function(){return this.getUserLogin()},m.prototype.getUserLogin=function(){var e=this;return new Promise(function(r,t){if(e.auth.currentUser)return r(e.auth.currentUser);var n=e.auth.onAuthStateChanged(function(e){n(),e?r(e):t()})})},m.prototype.HandleGetPermissions=function(){try{var e=this;return u(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.claims})})},function(e){return o("HandleGetPermission: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},e.FirebaseDataProvider=function(e,t){var n=t||{};!function(e,r){if(!(e||r&&r.app))throw new Error("Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider");r.rootRef&&c(r.rootRef,"test")}(e,n),s(e,n),o("react-admin-firebase:: Creating FirebaseDataProvider",{firebaseConfig:e,options:n});var i=new d;return i.init(e,t),h=new f(i,n),function(e,t,n){try{switch(o("FirebaseDataProvider: event",{type:e,resourceName:t,params:n}),e){case r.GET_MANY:return Promise.resolve(h.apiGetMany(t,n));case r.GET_MANY_REFERENCE:return Promise.resolve(h.apiGetManyReference(t,n));case r.GET_LIST:return Promise.resolve(h.apiGetList(t,n));case r.GET_ONE:return Promise.resolve(h.apiGetOne(t,n));case r.CREATE:return Promise.resolve(h.apiCreate(t,n));case r.UPDATE:return Promise.resolve(h.apiUpdate(t,n));case r.UPDATE_MANY:return Promise.resolve(h.apiUpdateMany(t,n));case r.DELETE:return Promise.resolve(h.apiDelete(t,n));case r.DELETE_MANY:return Promise.resolve(h.apiDeleteMany(t,n));default:return Promise.resolve({})}}catch(e){return Promise.reject(e)}}},e.FirebaseAuthProvider=function(e,r){!function(e,r){if(!(e||r&&r.app))throw new Error("Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider")}(e,r);var t=new m(e,r);return s(e,r),{login:function(e){return t.HandleAuthLogin(e)},logout:function(){return t.HandleAuthLogout()},checkAuth:function(){return t.HandleAuthCheck()},checkError:function(e){return t.HandleAuthError(e)},getPermissions:function(){return t.HandleGetPermissions()}}}});
//# sourceMappingURL=index.umd.js.map
