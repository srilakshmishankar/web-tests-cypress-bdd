build:
	npm install

e2e-tests-local-run-download-test:
	npm run test:download

e2e-tests-local-run-upload-test:
	npm run test:upload

e2e-tests-local-run-all-test:
	npm run test:all

e2e-tests-local-development:
	npm run cy:open

e2e-tests-docker:
	docker run -it -v $PWD:/e2e -w /e2e cypress/included:9.5.3
