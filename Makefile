
REPORTER = spec

test:
	@./node_modules/.bin/mocha \
		--require should \
		--colors \
		--ui bdd \
		--reporter $(REPORTER) \
		--recursive

.PHONY: test
