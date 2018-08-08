[![NPM](https://nodei.co/npm/scan-directory.png?downloads=true&stars=true)](https://nodei.co/npm/scan-directory/)

Blasing fast directory scan. Uses async/await underneath, doing all the stuff in async and parallel way
 
#Usage

```javascript
import scan, {forExt} from 'scan-directory';

const list = await scan(directory: string, acceptFunction, [rejectFunction=skipNodeModules]);
```
For example
```js
const list = await scan(
  __dirName,    // where 
  forExt('js'), // what
  (fileName) => fileName.match(somePattern)) // what NOT
```

Where acceptFunction and rejectFunction - (fileName:string, stat) => boolean.