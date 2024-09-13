import memberService from '../services/memberService.js';

const list = async (req, res, next) => {
    try {
        const result = await memberService.list();
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export default { list };
