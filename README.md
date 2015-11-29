# grunt-env2js

> Write your environment variables to a JS file before concatenate them.

## The "env2js" task

### Motivation
Avoid **polluting the DOM** by passing backend variables directly in HTML files.  

```html
<!-- What we currently do -->
<script>
    var my_public_api_key = "{{ injected_from_backend }}";
</script>
<script src="/bundle/who/uses/my_public_api_key.js"></script>
```

Where you could write a `.js` file that contains your backend settings and ends up concatenate with your bundle(s).

### Usage Examples

#### Default Options
If you only specify `src`, the default options are used to build the output:

```js
grunt.initConfig({
    // [...] others tasks here
  env2js: {
    dist: {
        options: {
            // Names of currently availables environment variables 
          src: ['MY_ENV_1', 'MY_ENV2']
        }
    }
  },
});
```

##### The generated result would be:
```js
// dest: env.js
var env = {
    "MY_ENV_1": "foo",
    "MY_ENV_2": "bar"
};
```

Now if I concatenate `env.js` in my bundle output, I can make use of my backend variables, like usually:
```js
// example: other_script.js
var service = MyService.configure(env["MY_ENV_1"], env["MY_ENV_2"]);
```

#### Custom Options
In this example, custom options are used to specify output file and namespace.

```js
grunt.initConfig({
  env2js: {
    dist: {
        options: {
          src: ['MY_ENV_1', 'MY_ENV2'],
          dest: 'build/tmp.js',
          namespace: 'globals'
        }
    }
  },
});
```

##### The generated result would be:
```js
// dest: build/tmp.js
var globals = {
    "MY_ENV_1": "foo",
    "MY_ENV_2": "bar"
};
```

### Options

#### src
Type: `Array`
Default value: `[]`

**Required**: Array containing names of the environment variables to output.

#### dest
Type: `String`
Default value: `'env.js'`

Path to output file.

#### namespace
Type: `String`
Default value: `'env'`

Name of the object containing the variables.

### Troubleshooting
Be sure any variables declared in `src` is accessible from your current env.  
*eg. Test that MY_ENV_VAR exists:*
```sh
    $ export MY_ENV_VAR=123
    $ echo $MY_ENV_VAR
=>  123
```
