# ngprobe

Extends Chrome Devetools by adding a sidebar that displays the Angular Component or Angular JS scope associated with element($0) selected in Elements tab.

## How it works

The extension evaluates the following expression in the context of the page and dsiplays the results in ```ngprobe``` sidebar pane :

If Angular is detecetd:

```
    ng.probe($0).componentInstance

    where:

    $0 is the element selected in Elements tab.
```

If AngularJS is detecetd:

```
    angular.element($0).scope()

    where:

    $0 is the element selected in Elements tab.
```

Also shows parent components and scopes as an array.