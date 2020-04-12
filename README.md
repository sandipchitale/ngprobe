# ngprobe

Chrome Devetools Elements sidebar to displays Angular (pre-Ivy and Ivy) Component and AngularJS Scope for selected element i.e. $0.

## How it works

The extension evaluates the following expression in the context of the page and dsiplays the results in ```ngprobe``` sidebar pane.

If Angular (Ivy) is detecetd:

```
    ng.getComponent($0) || ng.getOwningComponent($0)

    where:

    $0 is the element selected in Elements tab.
```

If Angular (pre Ivy) is detecetd:


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

The values of component properties can be edited in the ```ngprobe``` sidebar pane.