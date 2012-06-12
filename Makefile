test:
	@./node_modules/.bin/mocha \
		--require should \
		-c \
		--ui bdd \
		-R spec

.PHONY: test
