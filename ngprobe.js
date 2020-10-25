(function () {
  chrome.devtools.panels.elements.createSidebarPane('ngprobe',
    function (sidebar) {
      sidebar.setHeight('50em');
      function angularComponent() {
        function getPanelContents() {
          var detected,
              detectedIvy,
              detectedAngular,   node,          parentNode,          parentNodes = [],
              detectedAngularJS, nodeAngularJS, parentNodeAngularJS, parentNodesAngularJS = [],
              error;
          try {
            if (window.ng || window.angular && window.angular.element) {
              detected = true;
              detectedIvy = false;
              if (window.ng) {
                if (window.ng.getComponent && window.ng.getOwningComponent) {
                  // Angular 9+
                  let e = $0;
                  while (e) {
                    if (window.ng.getComponent(e) || window.ng.getOwningComponent(e)) {
                      detectedIvy = true;
                      detectedAngular = true;
                      node = window.ng.getComponent(e) || window.ng.getOwningComponent(e);
                      parentNode = node;
                      if (parentNode) {
                        parentNode = ng.getOwningComponent(parentNode);
                        while (parentNode) {
                          if (parentNodes.indexOf(parentNode) === -1) {
                            parentNodes.unshift(parentNode);
                          }
                          parentNode = ng.getOwningComponent(parentNode);
                        }
                      }
                      break;
                    } else {
                      // Keep trying parent elements
                      e = e.parentElement;
                    }
                  }
                } else if (window.ng.probe) {
                  if (window.ng.probe($0) && window.ng.probe($0).componentInstance) {
                    detectedAngular = true;
                    node =  window.ng.probe($0).componentInstance;
                    parentNode = window.ng.probe($0);
                    if (parentNode) {
                      parentNode = parentNode.parent;
                      while (parentNode && parentNode.componentInstance) {
                        if (node !== parentNode.componentInstance && parentNodes.indexOf(parentNode.componentInstance) === -1) {
                          parentNodes.unshift(parentNode.componentInstance);
                        }
                        parentNode = parentNode.parent;
                      }
                    }
                  }
                }
              }
              if (window.angular && window.angular.element) {
                if (window.angular.element($0) && window.angular.element($0).scope()) {
                  detectedAngularJS = true;
                  nodeAngularJS = window.angular.element($0).scope();
                  parentNodeAngularJS = nodeAngularJS;
                  if (parentNodeAngularJS) {
                    parentNodeAngularJS = parentNodeAngularJS.$parent;
                    while (parentNodeAngularJS) {
                      parentNodesAngularJS.unshift(parentNodeAngularJS);
                      parentNodeAngularJS = parentNodeAngularJS.$parent;
                    }
                  }
                }
              }
            }
          } catch(ex) {
            error = ex;
          }
          if (detectedAngular && detectedAngularJS) {
            return {
              $1$_framework_______: (detectedIvy ?  '_______ Angular (Ivy) Components _' : '_______ Angular Components ______'),
              $1$_parentComponents: parentNodes,
              $1__component_______: node,
              $2__________________: '_________________________________',
              $3$_framework_______: '_______ AngularJS Scopes ________',
              $3$_parentScopes____: parentNodesAngularJS,
              $3__scope___________: nodeAngularJS,
              $4__________________: '_________________________________',
            };
          } else if (detectedAngular) {
            return {
              $1$_framework_______: '_______ Angular Components ______',
              $1$_parentComponents: parentNodes,
              $1__component_______: node,
              $2__________________: '_________________________________',
            };
          } else if (detectedAngularJS) {
            return {
              $3$_framework_______: '_______ AngularJS Scopes ________',
              $3$_parentScopes____: parentNodesAngularJS,
              $3__scope___________: nodeAngularJS,
              $4__________________: '_________________________________',
            };
          } else if (error) {
            return {
              $: error
            }
          } else if (detected) {
            return {
              $: 'Niether a Angular Component nor a AngularJS Scope is associated with selected element $0'
            }
          } else {
            return {
              $: 'This is niether a Angular nor a AngularJS application'
            }
          }
        }
        sidebar.setExpression(
          "(" + getPanelContents.toString() + ")()"
        );
      }
      angularComponent();
      chrome.devtools.panels.elements.onSelectionChanged.addListener(angularComponent);
    });
})();
