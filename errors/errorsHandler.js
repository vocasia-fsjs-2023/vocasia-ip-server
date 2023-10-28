export default (error, req, res, next) => {
  if (error instanceof yup.ValidationError) {
    return res.status(400).json({
      message: error.message,
    });
  }

  if (error instanceof Sequelize.ValidationError) {
    return res.status(400).json({
      message: error.errors[0].message,
    });
  }

  if (error instanceof Sequelize.ForeignKeyConstraintError) {
    return res.status(400).json({
      message: error.message,
    });
  }

  if (error instanceof Sequelize.UniqueConstraintError) {
    return res.status(400).json({
      message: "Username or email already exists",
    });
  }

  if (error instanceof Sequelize.DatabaseError) {
    return res.status(400).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: error.message,
  });
};
