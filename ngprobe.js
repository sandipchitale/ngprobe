(function () {
  chrome.devtools.panels.elements.createSidebarPane('ngprobe',
    function (sidebar) {
      sidebar.setHeight('50em');
      function angularComponent() {
        function getPanelContents() {
          var detected, node, parentNode, parentNodes = [], error;
          try {
            if (window.ng && window.ng.probe) {
              detected = 'angular';
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
            } else if (window.angular && window.angular.element) {
              detected = 'angularjs';
              node =  window.angular.element($0).scope();
              parentNode = node;
              if (parentNode) {
                parentNode = parentNode.$parent;
                while (parentNode) {
                  parentNodes.unshift(parentNode);
                  parentNode = parentNode.$parent;
                }
              }
            } else {
              error = 'This is niether a Angular nor a AngularJS application';
            }
          } catch(ex) {
            node = ex;
          }
          if (detected === 'angular') {
            return {
              $: 'Angular Component',
              $parentComponents: parentNodes,
              component: node
            }
          } if (detected === 'angularjs') {
            return {
              $: 'AngularJS Scope',
              $parentScopes: parentNodes,
              scope: node
            }
          } else {
            return {
              $: error
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
