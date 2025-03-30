# Angular Renaissance Workshop

## What we will build

During this workshop, we will build a simple todo-list application using some of the latest Angular features:

- [Signals](https://angular.dev/guide/signals)
- [Resources](https://angular.dev/guide/signals/resource)
- [Control flow](https://angular.dev/guide/templates/control-flow)
- [Reactive](https://angular.dev/guide/forms/reactive-forms) & [Typed Forms](https://angular.dev/guide/forms/typed-forms)
- [Standalone Components](https://v17.angular.io/guide/standalone-components)
- [NgRx SignalStore](https://ngrx.io/guide/signals/signal-store) + [Entity Management](https://ngrx.io/guide/signals/signal-store/entity-management)

As you will see, modern Angular development can be very elegant and we will break down some preconceived notions that might exists about Angular being too verbose or cumbersome to work with.

## Workshop preparation

In order to get most out of this workshop, you should do some preparation in terms of refreshing your knowledge and setting up the development environment.

As part of your preparations, you will have to clone a repository that we have created as a starting point for our workshop. This is to save time of doing the tedious setup and use our workshop time doing the exciting parts.

### Prerequisite knowledge

This workshop requires some prior knowledge and **experience with frontend development**. **TypeScript** knowledge is recommended, but if you know **JavaScript** well, you will be able to understand TypeScript code that we will be writing during the workshop. Here are some resources for refreshing your JS and TS knowledge:

- [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [TypeScript fundamentals](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Basic `git` knowledge](https://docs.github.com/en/get-started/git-basics) (you will have to clone the repository and commit locally)

As the purpose of this workshop is to learn modern Angular development, we also expect that you **know the fundamentals of Angular**. If you are new to Angular and would like to participate in the workshop, here are some good resources for learning Angular that we recommend going over:

- [Angular Essentials](https://angular.dev/essentials)
- [Learn Angular Tutorial](https://angular.dev/tutorials/learn-angular)

### Development environment setup

You will be developing on your own laptop. In order to save time and use the workshop timeslot efficiently, please come prepared:

1. Make sure you have [`git`](https://docs.github.com/en/get-started/git-basics/set-up-git) installed.
1. Make sure you have [`node` and `npm`](https://nodejs.org/en/download) installed. We recommend using the latest LTS version (as of writing, that is 22.14.0)
1. Install the [Angular CLI](https://angular.dev/tools/cli/setup-local)
1. Clone [this repository from GitHub](https://github.com/fvoska/ng-renaissance-workshop)
1. Run `npm ci` in order to set up dependencies
   - if you want, you can [fork it](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)

Now, you should be ready to start development by starting the local development server:

```bash
ng serve
```

Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload whenever you modify any of the source files.

### Keeping up-to-date

There might be some additions to the starter repository between now and the day of the workshop. On the day of the workshop, you should pull any changes that might have been made to the repository. If you forked it, make sure to [sync with upstream](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).
