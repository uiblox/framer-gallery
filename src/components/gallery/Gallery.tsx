import { delay } from "motion";
import { useFetch } from "../../hooks/useFetch";
import { motion } from "motion/react";

export const Gallery = () => {
  const { data: images } = useFetch();

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  duration: 0.6,
                },
              },
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.6,
              }}
              className="text-4xl font-bold mb-4"
            >
              Image Gallery with Lightbox
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="text-lg text-slate-300"
            >
              Click on any imager to get addition details
            </motion.p>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.6,
              },
            },
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {images?.map((img, index) => {
            return (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  delay: index * 0.1,
                }}
                key={img.id}
              >
                <img
                  src={`${img.urls.regular}?auto=format&fit=crop&w=1200&q=90`}
                  alt={img.alt_description ?? "Gallery image"}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
