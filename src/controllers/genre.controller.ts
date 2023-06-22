import { PrismaClient, films, genres } from "@prisma/client";
import { Request, Response } from "express";

const prismaGenre = new PrismaClient().genres;
const prismaFilm = new PrismaClient().films;

// GET /genre
// Get all genres
exports.getAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await prismaGenre.findMany();
    res.status(200).json(genres);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};


// POST /genre
// Create new genre
exports.createGenre = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    if (!name) {
      res.status(400).json("missing required fields");
    }

    const genre: genres = await prismaGenre.create({
      data: {
        name: name,
      },
    });
    res.status(201).json(genre);
  } catch (e: any) {
    res.status(500).json({ message: e.message, body: req.body });
  }
};

// DELETE /genre/:id
// Delete genre by id
exports.deleteGenre = async (req: Request, res: Response) => {
  try {
    const checkGenre = await prismaGenre.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!checkGenre) {
      res.status(404).json({ message: "Genre not found" });
    }

    const isGenreInFilm = await prismaFilm.findFirst({
      where: {
        genre_id: parseInt(req.params.id),
      },
    });
    if (isGenreInFilm) {
      res.status(400).json({ message: "Genre is in use" });
    } else {
      const genre = await prismaGenre.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(204).json({ message: "Genre deleted" });
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
