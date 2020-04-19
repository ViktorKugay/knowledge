---
title: Do you base64 encoding query params?
date: '2020-04-05T00:00:00.000Z'
image: https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
description: Don`t trust base64 query params encoding. These aren't the Droids you're looking for.
---

We use URI a lot every day, but what do we really know about it? Fortunately, we can read [tools.ietf.org](https://tools.ietf.org/html/rfc3986) - the document specifies an Internet standards track protocol for the Internet community. A Uniform Resource Identifier (URI) is a compact sequence of characters that identifies an abstract or physical resource. Let's read about URI Characters.

> The URI syntax provides a method of encoding data, presumably for the  
> sake of identifying a resource, as a sequence of characters.

Link will be transformed within **RFC 3986 URI Generic Syntax** and will be encode to **ABNF** notation.

> This specification uses the Augmented Backus-Naur Form (ABNF)  
> notation, including the following core ABNF syntax rules  
> defined by that specification: ALPHA (letters), CR (carriage return),  
> DIGIT (decimal digits), DQUOTE (double quote), HEXDIG (hexadecimal  
> digits), LF (line feed), and SP (space).

The ABNF notation defines its terminal values to be non-negative integers (codepoints) based on the US-ASCII coded character set. A URI is composed from a limited set of characters consisting of digits, letters, and a few graphic symbols. The latest definition is the most trouble shooting for us. If data for a URI component would conflict with a reserved
character's purpose as a delimiter, then the conflicting data must be percent-encoded before the URI is formed. Let's check list of symbols:

> sub-delims = "!" / "\$" / "&" / "'" / "(" / ")" / "\*" / **"+"** / "," / ";" / "="

And now let's do it again with base64 symboles list

> Uppercase letters (indices 0-25): ABCDEFGHIJKLMNOPQRSTUVWXYZ  
> Lowercase letters (indices 26-51): abcdefghijklmnopqrstuvwxyz  
> Digits (indices 52-61): 0123456789  
> Special symbols (indices 62-63): **+** /

It seems like we find out potential errors! Focus your attention on "+" symbols. This symbol exist into two lists but with different meaning. We can find more about using the plus symbol into query params on [w3.org](https://www.w3.org/Addressing/URL/uri-spec.html).

> Within the query string, the plus sign is reserved as shorthand notation for a space.  
> Therefore, real plus signs must be encoded.  
> This method was used to make query URIs easier to pass in systems which did not allow spaces.

The characters allowed in a URI are either reserved or unreserved (or a percent character as part of a percent-encoding). Reserved characters are those characters that sometimes have special meaning. For example, forward slash characters are used to separate different parts of a URL (or more generally, a URI). Unreserved characters have no such meanings. Using percent-encoding, reserved characters are represented using special character sequences. The sets of reserved and unreserved characters and the circumstances under which certain reserved characters have special meaning have changed slightly with each revision of specifications that govern URIs and URI schemes.

Another worlds we have two lists:

- Reserved Characters [RFC 3986 section 2.2](https://tools.ietf.org/html/rfc3986#section-2.2)

- Unreserved Characters [RFC 3986 section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)

Other characters in a URI must be percent encoded.

There is a source of many mistakes. We have only one concurrence and it is not safe anymore. Other encoder can bring more conflicts. Particular example can be provide using "qs" library. Just try execute.

```javascript
qs.parse('key=some+value');
```

Don`t be surprised but you will receive:

```javascript
{
  key: 'some value';
}
```

Another troubleshooting is unit testing base64 encoders. Popular lybraries like **js-base64** switch algorithms depending on the execution environment. js-base64 using standart atob - btoa browser utilites for encode and decode base64 strings but Nodejs have no helpers like this so js-base64 developers using polifill but polifill doesn`t generate the same exceptions like atob-bota window methods. See [js-base64](https://github.com/dankogai/js-base64/blob/e8a9a09edaf79fddee3623d97421151dcbd384c9/base64.js#L142).

```javascript
var _atob = global.atob
  ? function(a) {
      return global.atob(a);
    }
  : function(a) {
      return a.replace(/\S{1,4}/g, cb_decode);
    };
```

Let's check some example. The "+" symbol will be transformed to '%3D' characters using encodeURIComponent. For many reasons this string might be not decoded. Runtime execution atob on this string will generate exception. During local testing js-base64 hides an exception and continues code execution.

```javascript
atob('%3D'); // Uncaught DOMException: Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.
```

vs

```javascript
Base64.decode('%3D'); // �
```

Conflict of meanings is the most troubleshooting while using base64 into URI. If you continue find information about this problem you will find [tools.ietf.org](https://tools.ietf.org/html/rfc3548#page-6). Section four describe official way resolving conflicts. Let's see "Base 64 Encoding with URL and Filename Safe Alphabet" chapter and check "Table 2: The "URL and Filename safe" Base 64 Alphabet". There is no "+" symbol. Proceed reading.

> This encoding should not be regarded as the same as the "base64"  
> encoding, and should not be referred to as only "base64". Unless  
> made clear, "base64" refer to the base 64 in the previous section.

Oh no! Using multiple incompatible versions of base64 is not effective decision. If you create simple project with one or two developers there is no problem but large team can have a many trouble. Decision like this is not obviously. Someday John from next department will generate links with standard encoder and what will you receive? Angry users. So when you choose way for encode query params check list of symbols and be sure there no conflicts.

## Conclusion

The simple features can bring a lot of troubles in production. Check particular realisation of your favorite libraries and be sure that you never catch conflicts like this. What should we do? The good question. First of all read docs and check every decode string before and after decoding and this why do you really need using encoding user data in query params?
