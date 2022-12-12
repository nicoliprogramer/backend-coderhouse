const checkAdmin = (admin) => (request, response, next) => {
    const { method, originalUrl } = request;
    const authorized = admin ? true : false;
  
    if (authorized) {
      next();
    } else {
      response.status(401).json({
        error: -1,
        descripcion: `ruta '${originalUrl}' método '${method}' NO autorizado`,
        user: request.user
      });
    }
  };
  
  module.exports = checkAdmin;