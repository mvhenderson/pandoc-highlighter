# Filter Test

Test to ensure the filter produces valid documents.

## Javascript

```javascript
console.log("Hello");
```

## Custom Mode

```theLetterO
The quick
brown fox
jumped over
the lazy dog.
```

## CodeMirror Mode

```{.gas architecture=ARMv6}
.syntax unified
.global main

/*
 *  A
 *  multi-line
 *  comment.
 */

@ A single line comment.

main:
        push    {sp, lr}
        ldr     r0, =message
        bl      puts
        mov     r0, #0
        pop     {sp, pc}

message:
        .asciz "Hello world!<br />"
```
