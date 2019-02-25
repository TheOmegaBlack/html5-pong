class CanvasRenderer {
  constructor(w, h) {
    const canvas = document.createElement('canvas');
    this.w = canvas.width = w;
    this.h = canvas.height = h;
    this.view = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = true;
  }
  
  render(container, clear = true) {
    const { ctx } = this;
    function renderRec(container) {
      // Render the container children
      container.children.forEach(child => {
        if (child.visible === false) {
          return;
        }
        ctx.save();

        // Handle transforms
        if (child.pos) {
          ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
        }

        // Draw the leaf node
        if (child.text !== undefined) {
          const { font, fill, align } = child.style;
          if (font) ctx.font = font;
          if (fill) ctx.fillStyle = fill;
          if (align) ctx.textAlign = align;
          ctx.fillText(child.text, 0, 0);
        } else if (child.render) {
          child.render(ctx);
        }
        if (child.children) {
          renderRec(child);
        }
        ctx.restore();
      });
    }
    if (clear) {
      ctx.clearRect(0, 0, this.w, this.h);
    }
    renderRec(container);
  }
}

export default CanvasRenderer;
