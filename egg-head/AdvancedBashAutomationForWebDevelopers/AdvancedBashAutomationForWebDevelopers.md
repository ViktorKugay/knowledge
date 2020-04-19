# AdvancedBashAutomationForWebDevelopers

`$PATH` - env which contain all paths to files with executive files
`which` - show place of executive command.
`export` - export env to all process and scripts
`>` - write STDOUT to file

1. Create .bash_profile file and write to them env to executive files.

```bash

touch .bash_profile &&
echo 'alias eH="echo hello"' > .bash_profile &&
source .bash_profile
```

And alias will be work fine.

2. To make scripts just create directory and add this to \$PATH env with _export_ key word. Then create file with script ad give permision with `chmod +x file` command.

or

Create link and put it into local/bin folder like \$PATH env. Exactly, give permisions with `chmod +x` command, then create link `ln -s` and that is all. (_-s_ mean symbolic);

3. Comma in bash. Use {} for multiple executions. For example:

- `echo {1..10}` give 1 2 3 4 5 6 7 8 9 10
- `echo {a..z}` alphabet
- `echo index{,.controller}.js` index.js index.controller.js

It's a very usefull way to reusage code.

4. `!!` - retry last command

- `!$` - take last argument of the previouse command.
- `CTRL + A` go to the start of line
- `CTRL + E` go to the end of line
- `CTRL + K` clear line up to the cursor
- `CTRL + W` delete last world
- `CTRL + L` clear console

5. `jq` is utilite to write JSON files

`echo '{"a": {"b": 1 }}' | jq .a.b` => 1
`echo '[1, 2, 3]'| jq .[]` => 1 2 3 _it's like a loop_
`jq '.dependencies | keys | .[]' package.json` => give list of the project packages

6. Search unused packages into project.

```bash

for dep in $(jq -r '.dependencies | keys | .[]' package.json); do
    if ! grep "require\(.*$dep.*\)" -Rq --execlude-dir="node_modules" .; then
        echo "You can probably remove $dep"
    fi
done
```

7. Standart STDIN, STDOUT, STDERROR.

- `1>` redirect STDOUT to file
- `2>` redirect STDERROR to file
- `2>&1` redirect both output to file

**ls -la / > result.txt 2>&1** both STD

8. Find package.json changes

```bash

#! /bin/bash

exec >> log/hooks-out.log 2>&1

if git diff-tree --name-only --no-commit-id ORIG_HEAD HEAD  | grep -q "package.json"; then

    echo "$(date): Running npm install because package.json changed"
    npm install > /dev/null

else
    echo "$(date): No changes in package.json found"

fi
```

This script look to the package.json and if package.json has change start npm install. Very usefull.

9. Switch like bash script

```bash

case "$1" in
    a) echo "a natched";;
    b) echo "b matched";;
    c)
        echo "c matched"
    ;;
esac
```

and example

```bash

case "$1" in
    *.tar|*.tgz) tar -xzvf "$1";;
    *.gz) ggunzip -k "$1";;
    *.zip) unzip -v "$1";;
    *)
        echo "Cannot extract $1"
esac
```

10. While loops

`\?` - unknown options

```bash

while getopts 'a' opt; do
    case "$opt" in
        a) echo "$opt";;
    esac
done
```

11. Simple optarg example

Get flags and args into while loop.

```bash

#!/bin/bash

while getopts ':ab:' opt; do
  case "$opt" in
    a) echo "a found";;
    b) echo "b found and the value $OPTARG";;
    \?) echo "none";;
  esac
done

shift $(( OPTIND - 1))

for arg in $@; do
  echo "recived arg $arg"
done
```

12. Open Pull request on gitHub using sh script

```bash

#!/bin/bash

current_branch=$(git rev-parse --abbrev-ref HEAD)
username=''
title=''
password=''

usage() {
    echo "Usage: open-pr [-u <username>] [-p <password/token>] [-t <title of the PR>] <body of the PR>"
}

while getopts ':u:p:t:h' opt; do
    case "$opt" in
        u) username="$OPTARG";;
        p) password="$OPTARG";;
        t) title="$OPTARG";;
        h)
            usage
            exit
        ;;
        \?)
            echo "Invalid option $OPTARG >&2"
            usage >&2
            exit 1
        ;;
    esac
done

shift $((OPTIND - 1))

if [[ $current_branch == 'master']]; then
    echo "You're already on master, create a new branch, push it, and then tun this script"
    exit 1
fi

# -z - empty string

check_if_set() {
    if [[-z $2]]; then
        echo "ERROR: $1 must be set" >&2
        usage >&2
        exit 1
    fi
}

check_is_set "username" $username
check_is_set "password" $password
check_is_set "title" $title

data=$(cat <<-END
{
    "title": "$title",
    "base": "master",
    "head": "$current_branch",
    "body": "$@"
}
END
)

status-code = $(curl -s --user "$username:$password" -X POST "https://api.github.com/repos/ccnokes/git-automation-sandbox/pulls" -d "$data" -w %{http_code} -o /dev/null)

if [[ $status_code == "201" ]]; then
    echo "Error occurred, $status_code status received" >&2
    exit 1
fi
```

13. Node.js script

Node js шэбэн

#!/user/bin/env node

Get params

```javascript
const [someParams1, someParams2] = process.argv.slice(2);
```

```javascript
#!/usr/bin/env node

// this script can be piped to and will filter a log file of ld-json to only lines that have a level of "error"

const {Transform} = require('stream');

class FilterLogs extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      let jsonChunk = chunk.toString();
      split('\n')
        .reduce((aggr, line) => {
          if (line) {
            let json = JSON.parse(line);
            if (json.level === 'error') {
              aggr.push(JSON.stringify(json));
              s;
            }
          }

          return aggr;
        }, [])
        .join('\n');

      if (jsonChunk) {
        this.push(jsonChunk + '\n');
      }

      callback();
    } catch (error) {
      callback(error);
    }
  }
}

// handle errors
process.on('uncaughtException', err => {
  process.stderr.write(`Uncaught exception: ${err}\n`);
  process.exit(1);
});

// do the actual work
process.stdin.pipe(new FilterLogs()).pipe(process.stdout);
```
