# Contributing

We are currently in the early release stages and are not open to outside
contributors. However, we plan on opening it up to additional contributors
when we emerge from the early release stage.

### Code Style

Please follow the
[AirBnB Javascript Style Guide](https://github.com/airbnb/javascript).

### Commit Messages

Commit messages should be formatted using the following pattern:
```
<type>: <subject>

<body>

Resolves: <issue URL>
See also: <reference URLs>
```

_Type_ describes the nature of the change and should be one of the following:

- `feature`: a new feature
- `fix`: a bug fix
- `docs`: changes to documentation
- `style`: formatting, missing semi colons, etc; no code change
- `refactor`: refactoring production code
- `test`: adding tests, refactoring test; no production code change
- `other`: updating build tasks, package manager configs, etc; no production
code change

_Subject_ is a short imperative statement of no more than 50 characters that
describes the intent of the commit.

_Body_ provides a more detailed explanation of the context, why, and what of
the changes included in the commit. Remember that the body shouldn't describe
how the code operates. Comments within the code should describe how it
functions when and where necessary. Be sure to separate the body from other
parts of the commit message using blank lines.

_Resolves_ documents one or more issues the commit closes. These should be
specified as URL's to those issues. Specify this as 'N/a' if the commit isn't
associated with an issue.

_See also_ may be used to reference any other supporting documentation. For
example, URL's to Gist's.

### Testing

Please update the tests to reflect your code changes. Pull requests will not
be accepted if they are failing
on [Travis CI](https://travis-ci.org/jdmedlock/memorygame).

### Documentation

Please update the docs accordingly so that there are no discrepencies between
the API and the documentation.

### Developing

*_TBD_*

#### Git Branches

![MemoryGame Git Workflow](https://github.com/jdmedlock/memorygame/blob/master/docs/Git%20-%20Team%20Workflow.png)

- `master`: Only updated from PR's from the `development` branch for release.
This branch always reflects the current production release.
- `development`: Reflects the candidate code for the next release. Developers
work in working branches, which are then pulled into this branch. All code
pulled into this branch must be tested and undergo peer review as part of the
PR process.
- `working branches`: Are individual branches created by each developer when
they are working on changes and bug fixes. There are 4 basic types of branches:
bug, feature, refactor and style, after the type comes the name, it should
specify on top of the branch type. For example feature/course-review.


Please don't include changes to `dist/` in your pull request. This should only
be updated when releasing a new version.

### Releasing

*_TBD_*

### Running Examples

*_TBD_*