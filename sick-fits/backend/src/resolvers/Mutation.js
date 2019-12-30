const Mutations = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem({
      data: {
        ...args
      }
    }, info);

    console.log(item)
    return item;
  },
  updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // find item
    console.log({parent, args, ctx, info})
    const item = await ctx.db.query.item({ where }, `{ id title }`);
    // check if they own the item
    // Todo
    // delete item
    return ctx.db.mutation.deleteItem({where}, info);
  }
};

module.exports = Mutations;
