# Caesar Encoding Tool

## Params

- -a, --action: an action 'encode'/'decode' - required
- -s, --shift: a number to use for caesar shift - required
- -i, --input: an input file name
- -o, --output: an output file name

## Usage examples

The simpliest case. Input and output occur from command line.

```
node caesar-cipher-cli -a encode -s 5
```

The case where input and output files are declared.

```
node caesar-cipher-cli-a encode -s 7 -i "./input.txt" -o "./output.txt"
```

Example with fullnamed parameters.

```
node caesar-cipher-cli--action encode --shift 7 --input plain.txt --output encoded.txt
```
