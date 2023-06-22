"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.0.3",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          require: "./lib/main.js",
          types: "./lib/main.d.ts",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^17.0.9",
        decache: "^4.6.1",
        dtslint: "^3.7.0",
        sinon: "^12.0.1",
        standard: "^16.0.4",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.3.2",
        tap: "^15.1.6",
        tar: "^6.1.11",
        typescript: "^4.5.4"
      },
      engines: {
        node: ">=12"
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module2) {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _log(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function config(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else {
            if (override === true) {
              process.env[key] = parsed[key];
            }
            if (debug) {
              if (override === true) {
                _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
              } else {
                _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
              }
            }
          }
        });
        return { parsed };
      } catch (e) {
        if (debug) {
          _log(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    var DotenvModule = {
      config,
      parse
    };
    module2.exports.config = DotenvModule.config;
    module2.exports.parse = DotenvModule.parse;
    module2.exports = DotenvModule;
  }
});

// src/controllers/actor.controller.ts
var require_actor_controller = __commonJS({
  "src/controllers/actor.controller.ts"(exports) {
    "use strict";
    var import_client = require("@prisma/client");
    var prisma = new import_client.PrismaClient().actors;
    exports.getAllActors = async (req, res) => {
      try {
        const actors2 = await prisma.findMany({
          include: {
            films_actors: true
          }
        });
        res.status(200).json(actors2);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
    exports.getActorById = async (req, res) => {
      try {
        const actor = await prisma.findUnique({
          where: {
            id: parseInt(req.params.id)
          },
          include: {
            films_actors: true
          }
        });
        if (!actor) {
          res.status(404).json({ message: "Actor not found" });
        } else {
          res.status(200).json(actor);
        }
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
    exports.createActor = async (req, res) => {
      const { first_name, last_name, date_of_birth, date_of_death } = req.body;
      try {
        if (!first_name || !last_name || !date_of_birth) {
          res.status(400).json("missing required fields");
        }
        const actor = await prisma.create({
          data: {
            first_name,
            last_name,
            date_of_birth,
            date_of_death: date_of_death ? date_of_death : void 0
          }
        });
        res.status(201).json(actor);
      } catch (e) {
        res.status(500).json({ message: e.message, body: req.body });
      }
    };
    exports.updateActor = async (req, res) => {
      const { first_name, last_name, date_of_birth, date_of_death } = req.body;
      try {
        const checkActor = await prisma.findUnique({
          where: {
            id: parseInt(req.params.id)
          }
        });
        if (!checkActor) {
          res.status(404).json({ message: "actor not found" });
        }
        let data = {};
        if (first_name)
          data.first_name = first_name;
        if (last_name)
          data.last_name = last_name;
        if (date_of_birth)
          data.date_of_birth = date_of_birth;
        if (date_of_death)
          data.date_of_death = date_of_death;
        if (Object.keys(data).length === 0) {
          res.status(400).json({ message: "missing required fields" });
        } else {
          const actor = await prisma.update({
            where: {
              id: parseInt(req.params.id)
            },
            data
          });
          res.status(200).json(actor);
        }
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
    exports.deleteActor = async (req, res) => {
      try {
        const checkActor = await prisma.findUnique({
          where: {
            id: parseInt(req.params.id)
          }
        });
        if (!checkActor) {
          res.status(404).json({ message: "actor not found" });
        }
        const actor = await prisma.delete({
          where: {
            id: parseInt(req.params.id)
          }
        });
        res.status(204).json(actor);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
  }
});

// src/middleware/auth.middleware.ts
var auth_middleware_exports = {};
__export(auth_middleware_exports, {
  checkApiKey: () => checkApiKey
});
var checkApiKey;
var init_auth_middleware = __esm({
  "src/middleware/auth.middleware.ts"() {
    "use strict";
    checkApiKey = (req, res, next) => {
      let apiKey = req.headers["x-api-key"];
      if (apiKey === process.env.API_KEY) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    };
  }
});

// src/routes/actor.routes.ts
var require_actor_routes = __commonJS({
  "src/routes/actor.routes.ts"(exports, module2) {
    "use strict";
    var import_express = __toESM(require("express"));
    var router = import_express.default.Router();
    var actorController = require_actor_controller();
    var { checkApiKey: checkApiKey2, checkAdmin } = (init_auth_middleware(), __toCommonJS(auth_middleware_exports));
    router.get("/", checkApiKey2, actorController.getAllActors);
    router.get("/:id", checkApiKey2, actorController.getActorById);
    router.post("/", checkApiKey2, actorController.createActor);
    router.put("/:id", checkApiKey2, actorController.updateActor);
    router.delete("/:id", checkApiKey2, actorController.deleteActor);
    module2.exports = router;
  }
});

// src/controllers/genre.controller.ts
var require_genre_controller = __commonJS({
  "src/controllers/genre.controller.ts"(exports) {
    "use strict";
    var import_client = require("@prisma/client");
    var prismaGenre = new import_client.PrismaClient().genres;
    var prismaFilm = new import_client.PrismaClient().films;
    exports.getAllGenres = async (req, res) => {
      try {
        const genres2 = await prismaGenre.findMany();
        res.status(200).json(genres2);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
    exports.createGenre = async (req, res) => {
      const { name } = req.body;
      try {
        if (!name) {
          res.status(400).json("missing required fields");
        }
        const genre = await prismaGenre.create({
          data: {
            name
          }
        });
        res.status(201).json(genre);
      } catch (e) {
        res.status(500).json({ message: e.message, body: req.body });
      }
    };
    exports.deleteGenre = async (req, res) => {
      try {
        const checkGenre = await prismaGenre.findUnique({
          where: {
            id: parseInt(req.params.id)
          }
        });
        if (!checkGenre) {
          res.status(404).json({ message: "Genre not found" });
        }
        const isGenreInFilm = await prismaFilm.findFirst({
          where: {
            genre_id: parseInt(req.params.id)
          }
        });
        if (isGenreInFilm) {
          res.status(400).json({ message: "Genre is in use" });
        } else {
          const genre = await prismaGenre.delete({
            where: {
              id: parseInt(req.params.id)
            }
          });
          res.status(204).json({ message: "Genre deleted" });
        }
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
  }
});

// src/routes/genre.routes.ts
var require_genre_routes = __commonJS({
  "src/routes/genre.routes.ts"(exports, module2) {
    "use strict";
    var import_express = __toESM(require("express"));
    var router = import_express.default.Router();
    var genreController = require_genre_controller();
    var { checkApiKey: checkApiKey2, checkAdmin } = (init_auth_middleware(), __toCommonJS(auth_middleware_exports));
    router.get("/", checkApiKey2, genreController.getAllGenres);
    router.post("/", checkApiKey2, genreController.createGenre);
    router.delete("/:id", checkApiKey2, genreController.deleteGenre);
    module2.exports = router;
  }
});

// src/controllers/film.controller.ts
var require_film_controller = __commonJS({
  "src/controllers/film.controller.ts"(exports) {
    "use strict";
    var import_client = require("@prisma/client");
    var prisma = new import_client.PrismaClient().films;
    exports.getAllFilms = async (req, res) => {
      try {
        const films2 = await prisma.findMany({
          include: {
            films_actors: true
          }
        });
        res.status(200).json(films2);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
    exports.getFilmById = async (req, res) => {
      try {
        const film = await prisma.findUnique({
          where: {
            id: parseInt(req.params.id)
          },
          include: {
            films_actors: true
          }
        });
        if (!film) {
          res.status(404).json({ message: "Film not found" });
        } else {
          res.status(200).json(film);
        }
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
    exports.createFilm = async (req, res) => {
      const { name, synopsis, release_year, genre_id, actors } = req.body;
      try {
        if (!name || !synopsis || !release_year || !genre_id) {
          res.status(400).json("missing required fields");
        }
        const film = await prisma.create({
          data: {
            name,
            synopsis,
            release_year: release_year ? release_year : void 0,
            genre_id,
            films_actors: actors ? actors : void 0
          }
        });
        res.status(201).json(film);
      } catch (e) {
        res.status(500).json({ message: e.message, body: req.body });
      }
    };
    exports.updateFilm = async (req, res) => {
      const { name, synopsis, release_year, genre_id, actors } = req.body;
      try {
        const checkFilm = await prisma.findUnique({
          where: {
            id: parseInt(req.params.id)
          }
        });
        if (!checkFilm) {
          res.status(404).json({ message: "Film not found" });
        }
        let data = {};
        if (name)
          data.name = name;
        if (synopsis)
          data.synopsis = synopsis;
        if (release_year)
          data.release_year = release_year;
        if (genre_id)
          data.genre_id = genre_id;
        if (actors)
          data.films_actors = actors;
        if (Object.keys(data).length === 0) {
          res.status(400).json({ message: "Missing fields" });
        }
      } catch (e) {
        res.status(500).json({ message: e.message, body: req.body });
      }
    };
    exports.deleteFilm = async (req, res) => {
      try {
        const checkFilm = await prisma.findUnique({
          where: {
            id: parseInt(req.params.id)
          }
        });
        if (!checkFilm) {
          res.status(404).json({ message: "Film not found" });
        }
        const film = await prisma.delete({
          where: {
            id: parseInt(req.params.id)
          }
        });
        res.status(204).json({ message: "Film deleted" });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
  }
});

// src/routes/film.routes.ts
var require_film_routes = __commonJS({
  "src/routes/film.routes.ts"(exports, module2) {
    "use strict";
    var import_express = __toESM(require("express"));
    var router = import_express.default.Router();
    var filmController = require_film_controller();
    var { checkApiKey: checkApiKey2, checkAdmin } = (init_auth_middleware(), __toCommonJS(auth_middleware_exports));
    router.get("/", checkApiKey2, filmController.getAllFilms);
    router.get("/:id", checkApiKey2, filmController.getFilmById);
    router.post("/", checkApiKey2, filmController.createFilm);
    router.put("/:id", checkApiKey2, filmController.updateFilm);
    router.delete("/:id", checkApiKey2, filmController.deleteFilm);
    module2.exports = router;
  }
});

// src/index.ts
require_main().config();
var express = require("express");
var bodyParser = require("body-parser");
var actorRoutes = require_actor_routes();
var genreRoutes = require_genre_routes();
var filmRoutes = require_film_routes();
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var HTTP_PORT = process.env.PORT;
app.use("/api/actor", actorRoutes);
app.use("/api/genre", genreRoutes);
app.use("/api/film", filmRoutes);
app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});
