


## theory discussion
    #AAA
        arrange
        - creating test data
        - define expected results
        - "mocking" - replace imported libraries with our own fake versions
        act
        - generate response from SUT(software under test)
        assert
        - define expected results
        - verification phase - compare generated response to expected results
    - deterministic
        - repeatable
        - independent of outside states
        - hand in hand with 'mocking'
    - isolated (result = single responsibility principle)
    - dependency injection (depends)
        - leaving responsibility of creating outside dependencies, outside
    - TDD(test driven development)
        - writing tests first

## implemantation
1. set up file structure
2. set up test file
3. run test w/ naive impl - verification before going too far
    3.1 docker exec in
    3.2 run 'python -m pytest'
4. followed the AAA
    - see above AAA notes

## TDD
1. write another test (pretty much the same as #impl section)
2. write our endpoint
