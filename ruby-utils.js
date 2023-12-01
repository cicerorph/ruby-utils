// Created by MubiLop with some ideas from other people

// Ruby Utils

class RubyUtils {
  ipCache = {};

  getInfo() {
    return {
      id: 'rubyutils',
      name: 'Ruby Utils',
      color1: "#b32ffa",
      color2: "#b32ffa",
      color3: "#b32ffa",
      blocks: [
        {
          opcode: 'wait',
          text: 'wait [TIME] seconds',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            TIME: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'fetch',
          text: 'fetch [URL]',
          blockType: Scratch.BlockType.REPORTER,
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/hello.txt'
            }
          }
        },
        {
          opcode: 'getFromGoogleImages',
          text: 'Get [SEARCH] from Google Images',
          blockType: Scratch.BlockType.REPORTER,
          arguments: {
            SEARCH: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'cats'
            }
          }
        },
        {
          opcode: 'generateFakeIP',
          text: 'generate fake IP with name [NAME]',
          blockType: Scratch.BlockType.REPORTER,
          arguments: {
            NAME: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'user'
            }
          }
        }
      ]
    };
  }

  wait(args) {
    return new Promise((resolve, reject) => {
      const timeInMilliseconds = args.TIME * 1000;
      setTimeout(() => {
        resolve();
      }, timeInMilliseconds);
    });
  }

  fetch(args) {
    return fetch(args.URL)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.error(error);
        return 'Uh oh! Something went wrong.';
      });
  }

  getFromGoogleImages(args) {
    const searchQuery = args.SEARCH; // Search argument provided in the block
    const apiUrl = `https://corsproxy.io/?https://mubilop-api.vercel.app/api/getImageLink?query=${searchQuery}`;
    
    return fetch(apiUrl)
      .then((response) => {
        return response.text();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        return 'Error fetching data.';
      });
  }

  generateFakeIP(args) {
    const name = args.NAME.toLowerCase().replace(/\s/g, ''); // Convert name to lowercase and remove spaces

    // Check if the fake IP for this name is already cached
    if (this.ipCache[name]) {
      return this.ipCache[name];
    }

    // Generate random numbers for each octet
    const firstOctet = Math.floor(Math.random() * 256);
    const secondOctet = Math.floor(Math.random() * 256);
    const thirdOctet = Math.floor(Math.random() * 256);
    const fourthOctet = name.charCodeAt(0) % 256;

    // Construct the fake IP
    const fakeIP = `${firstOctet}.${secondOctet}.${thirdOctet}.${fourthOctet}`;

    // Cache the fake IP for future use
    this.ipCache[name] = fakeIP;

    return fakeIP;
  }
}

Scratch.extensions.register(new RubyUtils());
