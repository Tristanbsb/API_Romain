import { PrismaClient, films } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient().films;


// GET /film
// Get all films
exports.getAllFilms = async (req: Request, res: Response) => {
  try {
    const films = await prisma.findMany({
      include: {
        films_actors: true,
      },
    });
    res.status(200).json(films);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

// GET /film/:id
// Get film by id
exports.getFilmById = async (req: Request, res: Response) => {
  try {
    const film = await prisma.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        films_actors: true,
      },
    });
    if (!film) {
      res.status(404).json({ message: "Film not found" });
    } else {
      res.status(200).json(film);
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

// POST /film
// Create new film
exports.createFilm = async (req: Request, res: Response) => {
  const { name, synopsis, release_year, genre_id, actors } = req.body;

  try {
    if (!name || !synopsis || !release_year || !genre_id) {
      res.status(400).json("missing required fields");
    }

    const film: films = await prisma.create({
      data: {
        name: name,
        synopsis: synopsis,
        release_year: release_year? release_year : undefined,
        genre_id: genre_id,
        films_actors: actors? actors : undefined,
      },
    });
    res.status(201).json(film);
  } catch (e: any) {
    res.status(500).json({ message: e.message, body: req.body });
  }
};

// PUT /film/:id
// Update film by id
exports.updateFilm = async (req: Request, res: Response) => {
  const { name, synopsis, release_year, genre_id, actors } = req.body;

  try{
    const checkFilm = await prisma.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!checkFilm) {
      res.status(404).json({ message: "Film not found" });
    }

    let data: any = {};
    if (name) data.name = name;
    if (synopsis) data.synopsis = synopsis;
    if (release_year) data.release_year = release_year;
    if (genre_id) data.genre_id = genre_id;
    if (actors) data.films_actors = actors;
    
    if (Object.keys(data).length === 0) {
      res.status(400).json({message: "Missing fields"});
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message, body: req.body });
  }
};

// DELETE /film/:id
// Delete film by id
exports.deleteFilm = async (req: Request, res: Response) => {
  try {
    const checkFilm = await prisma.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!checkFilm) {
      res.status(404).json({ message: "Film not found" });
    }

    const film = await prisma.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(204).json({ message: "Film deleted" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};