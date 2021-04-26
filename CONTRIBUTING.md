## Contributing

This product welcomes contributions the any open source community. Firstly, please raise an issue on the repository, as this will be used to discuss/agree on scope and feature/bug detail. Once agreed, please follow the [Running Locally](#running-locally) steps above to get started on your machine. Branch off `main` following logically branch naming conventions `feature/***` or `bug/***`. When contributing please try and meet these development principles:

- This software product follows a module architecture, please try and stay consistent to making small, reusable `modules` of code within the `lib/utils` directory.
- Ensure any new code updated the relevant unit tests found within the `tests/` directory. We use [Jest](https://jestjs.io/) for testing.
- Make sure you run `npm run all` before you push any changes to GitHub to ensure all tests, linting and building passes.

Once you are happy with the changes, please propose a pull request on the repository and the repository maintainers will review as soon as possible.
