/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/graphology-utils";
exports.ids = ["vendor-chunks/graphology-utils"];
exports.modules = {

/***/ "(ssr)/./node_modules/graphology-utils/is-graph.js":
/*!***************************************************!*\
  !*** ./node_modules/graphology-utils/is-graph.js ***!
  \***************************************************/
/***/ ((module) => {

eval("/**\n * Graphology isGraph\n * ===================\n *\n * Very simple function aiming at ensuring the given variable is a\n * graphology instance.\n */\n\n/**\n * Checking the value is a graphology instance.\n *\n * @param  {any}     value - Target value.\n * @return {boolean}\n */\nmodule.exports = function isGraph(value) {\n  return (\n    value !== null &&\n    typeof value === 'object' &&\n    typeof value.addUndirectedEdgeWithKey === 'function' &&\n    typeof value.dropNode === 'function' &&\n    typeof value.multi === 'boolean'\n  );\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ3JhcGhvbG9neS11dGlscy9pcy1ncmFwaC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFNBQVM7QUFDckIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGh5ZW9uXFxEZXNrdG9wXFxmcm9udGVuZC1oaWRkZW5ub2RlXFxub2RlX21vZHVsZXNcXGdyYXBob2xvZ3ktdXRpbHNcXGlzLWdyYXBoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogR3JhcGhvbG9neSBpc0dyYXBoXG4gKiA9PT09PT09PT09PT09PT09PT09XG4gKlxuICogVmVyeSBzaW1wbGUgZnVuY3Rpb24gYWltaW5nIGF0IGVuc3VyaW5nIHRoZSBnaXZlbiB2YXJpYWJsZSBpcyBhXG4gKiBncmFwaG9sb2d5IGluc3RhbmNlLlxuICovXG5cbi8qKlxuICogQ2hlY2tpbmcgdGhlIHZhbHVlIGlzIGEgZ3JhcGhvbG9neSBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0gIHthbnl9ICAgICB2YWx1ZSAtIFRhcmdldCB2YWx1ZS5cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNHcmFwaCh2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgIHZhbHVlICE9PSBudWxsICYmXG4gICAgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiB2YWx1ZS5hZGRVbmRpcmVjdGVkRWRnZVdpdGhLZXkgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2YgdmFsdWUuZHJvcE5vZGUgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2YgdmFsdWUubXVsdGkgPT09ICdib29sZWFuJ1xuICApO1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/graphology-utils/is-graph.js\n");

/***/ })

};
;