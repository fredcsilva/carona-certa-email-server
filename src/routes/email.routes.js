import express from 'express';
import { EmailController } from '../controllers/EmailController.js';

const router = express.Router();
const emailController = new EmailController();

/**
 * Rotas de email seguindo RESTful
 */

// POST /email/boas-vindas
router.post('/boas-vindas', (req, res, next) =>
  emailController.enviarBoasVindas(req, res, next)
);

// POST /email/recuperar-senha
router.post('/recuperar-senha', (req, res, next) =>
  emailController.enviarRecuperacaoSenha(req, res, next)
);

// POST /email/verificacao
router.post('/verificacao', (req, res, next) =>
  emailController.enviarVerificacao(req, res, next)
);

// POST /email/notificacao
router.post('/notificacao', (req, res, next) =>
  emailController.enviarNotificacao(req, res, next)
);

// POST /email/com-anexo
router.post('/com-anexo', (req, res, next) =>
  emailController.enviarComAnexo(req, res, next)
);

export default router;